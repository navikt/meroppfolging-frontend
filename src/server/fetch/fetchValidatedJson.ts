import { logger } from "@navikt/next-logger";
import type { z } from "zod";
import {
  RuntimeErrorCode,
  type RuntimeFetchErrorContext,
} from "@/constants/runtimeErrorContract";

type RuntimeFetchErrorCode =
  | typeof RuntimeErrorCode.UPSTREAM_HTTP_ERROR
  | typeof RuntimeErrorCode.UPSTREAM_NETWORK_ERROR
  | typeof RuntimeErrorCode.UPSTREAM_RESPONSE_PARSE_ERROR
  | typeof RuntimeErrorCode.UPSTREAM_RESPONSE_SCHEMA_MISMATCH;

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
}: {
  context: RuntimeFetchErrorContext;
  errorCode: RuntimeFetchErrorCode;
  errorMessage: string;
  upstreamStatus?: number;
}): void {
  logger.error(
    {
      ...context,
      error_code: errorCode,
      method: "GET",
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
  } catch {
    logFetchFailure({
      context,
      errorCode: RuntimeErrorCode.UPSTREAM_NETWORK_ERROR,
      errorMessage,
    });
    throw new Error(errorMessage);
  }

  if (!response.ok) {
    logFetchFailure({
      context,
      errorCode: RuntimeErrorCode.UPSTREAM_HTTP_ERROR,
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
      errorMessage,
      upstreamStatus: response.status,
    });
    throw new Error(errorMessage);
  }

  return parsed.data;
}
