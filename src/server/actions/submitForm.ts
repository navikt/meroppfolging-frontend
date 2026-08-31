"use server";

import { logger } from "@navikt/next-logger";
import { getToken } from "@navikt/oasis";
import { isAxiosError } from "axios";
import { headers } from "next/headers";
import { validateIdPortenToken } from "@/auth/getIdPortenToken";
import { navigateToLogin } from "@/auth/navigateToLogin";
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from "@/auth/tokenUtils";
import { getServerEnv, isLocalOrDemo } from "@/constants/envs";
import { serverRequest } from "@/libs/axios";
import type { FormRequest } from "@/server/schemas/formRequestSchema";

const submitFormFailureContext = {
  event: "submit_form_failed",
  operation: "submit_sen_oppfolging_form",
  upstream: "meroppfolging-backend",
} as const;

function getSubmitFormFailureDetails(error: unknown) {
  if (!isAxiosError(error)) {
    return { failure_kind: "unexpected_error" } as const;
  }

  if (error.response) {
    const httpStatus = error.response.status;
    return {
      failure_kind: "upstream_http_error",
      ...(typeof httpStatus === "number" &&
        Number.isInteger(httpStatus) &&
        httpStatus >= 100 &&
        httpStatus <= 599 && { http_status: httpStatus }),
    } as const;
  }

  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
    return { failure_kind: "upstream_timeout" } as const;
  }

  if (error.request) {
    return { failure_kind: "upstream_network_error" } as const;
  }

  return { failure_kind: "upstream_request_error" } as const;
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
