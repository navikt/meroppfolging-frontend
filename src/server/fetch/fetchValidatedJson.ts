import { logger } from "@navikt/next-logger";
import type { z } from "zod";
import {
  RuntimeErrorCode,
  type RuntimeFetchErrorContext,
} from "@/constants/runtimeErrorContract";
import {
  type FailureKind,
  type FailureStage,
  type TransportErrorCode,
  transportFailureDiagnostics,
} from "@/server/observability/failureDiagnostics";

type FetchValidatedJsonOptions<T> = {
  context: RuntimeFetchErrorContext;
  endpoint: string;
  errorMessage: string;
  headers: HeadersInit;
  schema: z.ZodType<T>;
};

function optionalUpstreamStatus(status: number) {
  return Number.isInteger(status) && status >= 100 && status <= 599
    ? { upstream_status: status }
    : {};
}

function logFetchFailure({
  context,
  errorCode,
  errorMessage,
  upstreamStatus,
  diagnostics,
  validation,
}: {
  context: RuntimeFetchErrorContext;
  errorCode: RuntimeErrorCode | TransportErrorCode;
  errorMessage: string;
  upstreamStatus?: number;
  validation?: SchemaFailureDiagnostics;
  diagnostics: {
    failure_kind?: FailureKind;
    failure_stage: FailureStage;
    cause_type?: string;
  };
}): void {
  logger.error(
    {
      ...context,
      error_code: errorCode,
      ...diagnostics,
      outcome: "failed",
      method: "GET",
      ...validation,
      ...(upstreamStatus === undefined
        ? {}
        : optionalUpstreamStatus(upstreamStatus)),
    },
    errorMessage,
  );
}

/**
 * Owns one terminal runtime-error log for the HTTP request and response
 * validation. The endpoint, response body and caught errors never cross the
 * logging seam.
 */
export async function fetchValidatedJson<T>({
  context,
  endpoint,
  errorMessage,
  headers,
  schema,
}: FetchValidatedJsonOptions<T>): Promise<T> {
  let response: Response;
  try {
    response = await fetch(endpoint, { method: "GET", headers });
  } catch (error) {
    const diagnostics = transportFailureDiagnostics(error);
    logFetchFailure({
      context,
      diagnostics: { ...diagnostics, failure_stage: "request" },
      errorCode:
        diagnostics.error_code ?? RuntimeErrorCode.UPSTREAM_NETWORK_ERROR,
      errorMessage,
    });
    throw new Error(errorMessage);
  }

  if (!response.ok) {
    logFetchFailure({
      context,
      errorCode: RuntimeErrorCode.UPSTREAM_HTTP_ERROR,
      diagnostics: { failure_kind: "http", failure_stage: "response" },
      errorMessage,
      upstreamStatus: response.status,
    });
    throw new Error(errorMessage);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    logFetchFailure({
      context,
      errorCode: RuntimeErrorCode.UPSTREAM_RESPONSE_PARSE_ERROR,
      diagnostics: {
        failure_kind: "invalid_response",
        failure_stage: "response_parse",
      },
      errorMessage,
      upstreamStatus: response.status,
    });
    throw new Error(errorMessage);
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    logFetchFailure({
      context,
      errorCode: RuntimeErrorCode.UPSTREAM_RESPONSE_SCHEMA_MISMATCH,
      validation: schemaFailureDiagnostics(parsed.error),
      diagnostics: {
        failure_kind: "invalid_response",
        failure_stage: "response_validation",
      },
      errorMessage,
      upstreamStatus: response.status,
    });
    throw new Error(errorMessage);
  }

  return parsed.data;
}

const issueCodes = new Set<string>([
  "invalid_type",
  "invalid_value",
  "too_big",
  "too_small",
  "invalid_format",
  "not_multiple_of",
  "unrecognized_keys",
  "invalid_union",
  "invalid_key",
  "invalid_element",
  "custom",
]);

type SchemaFailureDiagnostics = {
  validation_issue_codes: string;
  validation_issue_count: number;
};

/** Primitive fields only: issue codes are a closed set, never paths or messages. */
function schemaFailureDiagnostics(error: z.ZodError): SchemaFailureDiagnostics {
  const codes = new Set(
    error.issues.map((issue) =>
      issueCodes.has(issue.code) ? issue.code : "unknown",
    ),
  );
  return {
    validation_issue_codes: [...codes].sort().join(","),
    validation_issue_count: error.issues.length,
  };
}
