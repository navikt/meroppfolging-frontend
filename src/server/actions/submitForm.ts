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
import type { FormRequest } from "@/server/schemas/formRequestSchema";

const submitFormFailureContext = RuntimeErrorContext.SEN_OPPFOLGING_SVAR_SUBMIT;

function getSubmitFormFailureDetails(error: unknown) {
  if (!isAxiosError(error)) {
    return { error_code: RuntimeErrorCode.UNEXPECTED_ERROR } as const;
  }

  if (error.response) {
    const httpStatus = error.response.status;
    return {
      error_code: RuntimeErrorCode.UPSTREAM_HTTP_ERROR,
      ...(typeof httpStatus === "number" &&
        Number.isInteger(httpStatus) &&
        httpStatus >= 100 &&
        httpStatus <= 599 && { upstream_status: httpStatus }),
    } as const;
  }

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return { error_code: RuntimeErrorCode.UPSTREAM_TIMEOUT } as const;
  }

  if (error.request) {
    return { error_code: RuntimeErrorCode.UPSTREAM_NETWORK_ERROR } as const;
  }

  return { error_code: RuntimeErrorCode.UPSTREAM_REQUEST_ERROR } as const;
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
    logger.error(
      {
        ...submitFormFailureContext,
        ...getSubmitFormFailureDetails(error),
      },
      "Failed to submit registration",
    );
    throw new Error("Failed to submit registration");
  }
}
