"use server";

import { logger } from "@navikt/next-logger";
import { getToken } from "@navikt/oasis";
import { isAxiosError } from "axios";
import { headers } from "next/headers";
import { validateIdPortenToken } from "@/auth/getIdPortenToken";
import { navigateToLogin } from "@/auth/navigateToLogin";
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from "@/auth/tokenUtils";
import { getServerEnv, isLocalOrDemo } from "@/constants/envs";
import {
  ApiRequestRejectedEvent,
  RuntimeErrorCode,
  RuntimeErrorContext,
  RuntimeRejectionReason,
} from "@/constants/runtimeErrorContract";
import { serverRequest } from "@/libs/axios";
import {
  type FailureKind,
  type FailureStage,
  type TransportErrorCode,
  transportFailureDiagnostics,
} from "@/server/observability/failureDiagnostics";
import type { FormRequest } from "@/server/schemas/formRequestSchema";

const submitFormFailureContext = RuntimeErrorContext.SEN_OPPFOLGING_SVAR_SUBMIT;

type SubmitFormFailureDetails = {
  error_code: RuntimeErrorCode | TransportErrorCode | RuntimeRejectionReason;
  failure_kind?: FailureKind;
  failure_stage: FailureStage;
  cause_type?: string;
  rejection_reason?: RuntimeRejectionReason;
  upstream_status?: number;
};

const rejectionReasons = new Set<unknown>(
  Object.values(RuntimeRejectionReason),
);

function knownRejection(body: unknown): RuntimeRejectionReason | undefined {
  return typeof body === "object" &&
    body !== null &&
    "error_code" in body &&
    rejectionReasons.has(body.error_code)
    ? (body.error_code as RuntimeRejectionReason)
    : undefined;
}

function getSubmitFormFailureDetails(error: unknown): SubmitFormFailureDetails {
  if (!isAxiosError(error)) {
    const diagnostics = transportFailureDiagnostics(error);
    return {
      ...diagnostics,
      error_code: diagnostics.error_code ?? RuntimeErrorCode.UNEXPECTED_ERROR,
      failure_stage: "request",
    };
  }

  if (error.response) {
    const httpStatus = error.response.status;
    const rejection =
      httpStatus === 409 ? knownRejection(error.response.data) : undefined;
    return {
      error_code: rejection ?? RuntimeErrorCode.UPSTREAM_HTTP_ERROR,
      failure_kind: rejection ? "domain" : "http",
      failure_stage: "response",
      ...(rejection ? { rejection_reason: rejection } : {}),
      ...(typeof httpStatus === "number" &&
        Number.isInteger(httpStatus) &&
        httpStatus >= 100 &&
        httpStatus <= 599 && { upstream_status: httpStatus }),
    };
  }

  const diagnostics = transportFailureDiagnostics(error);
  return {
    ...diagnostics,
    error_code:
      diagnostics.error_code ??
      (error.request
        ? RuntimeErrorCode.UPSTREAM_NETWORK_ERROR
        : RuntimeErrorCode.UPSTREAM_REQUEST_ERROR),
    failure_stage: "request",
  };
}

export async function submitForm(formRequest: FormRequest): Promise<void> {
  if (isLocalOrDemo) {
    return Promise.resolve();
  }
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL;
  const path = `${url}/api/v2/senoppfolging/submitform`;
  const headersList = await headers();
  const isAuthenticated = await validateIdPortenToken();
  if (!isAuthenticated) {
    navigateToLogin();
  }
  const idportenToken = getToken(headersList);
  const exchangedToken =
    await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken);

  try {
    await serverRequest({
      url: path,
      accessToken: exchangedToken,
      method: "post",
      data: formRequest,
    });
  } catch (error) {
    const diagnostics = getSubmitFormFailureDetails(error);
    const rejected = diagnostics.rejection_reason !== undefined;
    const write = rejected
      ? logger.warn.bind(logger)
      : logger.error.bind(logger);
    write(
      {
        ...submitFormFailureContext,
        ...diagnostics,
        ...(rejected
          ? { event_type: ApiRequestRejectedEvent, outcome: "rejected" }
          : { outcome: "failed" }),
      },
      rejected
        ? "Svar på sen oppfølging ble avvist av en kjent domeneregel"
        : "Kunne ikke sende svar på sen oppfølging",
    );
    throw new Error("Failed to submit registration");
  }
}
