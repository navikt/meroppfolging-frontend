import { logger } from "@navikt/next-logger";
import type { z } from "zod";
import {
  RuntimeErrorCode,
  type RuntimeFetchErrorContext,
} from "@/constants/runtimeErrorContract";
import { transportFailureDiagnostics } from "@/server/observability/failureDiagnostics";

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
  validationErrors,
}: {
  context: RuntimeFetchErrorContext;
  errorCode: string;
  errorMessage: string;
  upstreamStatus?: number;
  validationErrors?: { code: string; path: string }[];
  diagnostics: {
    failure_kind: string;
    failure_stage: string;
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
      ...(validationErrors ? { validation_errors: validationErrors } : {}),
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
      errorCode: diagnostics.error_code,
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
      validationErrors: schemaFailureDiagnostics(parsed.error, context),
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

const validationPaths: Record<
  RuntimeFetchErrorContext["operation"],
  readonly string[]
> = {
  fetch_maksdato: ["$", "maxDate", "utbetaltTom", "gjenstaendeSykedager"],
  fetch_sen_oppfolging_status: [
    "$",
    "response",
    "responseDateTime",
    "hasAccessToSenOppfolging",
    ...[0, 1].flatMap((index) => [
      `response.${index}`,
      ...["questionType", "questionText", "answerType", "answerText"].map(
        (field) => `response.${index}.${field}`,
      ),
    ]),
  ],
};
const issueCodes = new Set([
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

function schemaFailureDiagnostics(
  error: z.ZodError,
  context: RuntimeFetchErrorContext,
): { code: string; path: string }[] {
  const paths = validationPaths[context.operation];
  return error.issues.slice(0, 20).map((issue) => {
    const path = issue.path.length === 0 ? "$" : issue.path.join(".");
    return {
      code: issueCodes.has(issue.code) ? issue.code : "unknown",
      path: paths.includes(path) ? path : "unknown",
    };
  });
}
