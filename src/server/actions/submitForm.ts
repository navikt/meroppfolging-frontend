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
  RuntimeErrorCode,
  RuntimeErrorContext,
} from "@/constants/runtimeErrorContract";
import { serverRequest } from "@/libs/axios";
import { transportFailureDiagnostics } from "@/server/observability/failureDiagnostics";
import type { FormRequest } from "@/server/schemas/formRequestSchema";

const submitFormFailureContext = RuntimeErrorContext.SEN_OPPFOLGING_SVAR_SUBMIT;

function getSubmitFormFailureDetails(error: unknown) {
  if (!isAxiosError(error)) {
    return {
      error_code: RuntimeErrorCode.UNEXPECTED_ERROR,
      ...transportFailureDiagnostics(error),
      failure_stage: "request",
    } as const;
  }

  if (error.response) {
    const httpStatus = error.response.status;
    const body: unknown = error.response.data;
    const rejection =
      httpStatus === 409 &&
      typeof body === "object" &&
      body !== null &&
      "error_code" in body &&
      (body.error_code === "ALREADY_RESPONDED" ||
        body.error_code === "NO_UTSENDT_VARSEL")
        ? body.error_code
        : undefined;
    return {
      error_code: rejection ?? RuntimeErrorCode.UPSTREAM_HTTP_ERROR,
      failure_kind: rejection ? "domain" : "http",
      failure_stage: "response",
      ...(rejection ? { rejection_reason: rejection } : {}),
      ...(typeof httpStatus === "number" &&
        Number.isInteger(httpStatus) &&
        httpStatus >= 100 &&
        httpStatus <= 599 && { upstream_status: httpStatus }),
    } as const;
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
    const rejected =
      "rejection_reason" in diagnostics &&
      diagnostics.rejection_reason !== undefined;
    const write = rejected
      ? logger.warn.bind(logger)
      : logger.error.bind(logger);
    write(
      {
        ...submitFormFailureContext,
        ...diagnostics,
        ...(rejected
          ? { event_type: "api_request_rejected", outcome: "rejected" }
          : { outcome: "failed" }),
      },
      rejected
        ? "Svar på sen oppfølging ble avvist av en kjent domeneregel"
        : "Kunne ikke sende svar på sen oppfølging",
    );
    throw new Error("Failed to submit registration");
  }
}
