"use server";

import { logger } from "@navikt/next-logger";
import { getToken } from "@navikt/oasis";
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
  } catch {
    logger.error(submitFormFailureContext, "Failed to submit registration");
    throw new Error("Failed to submit registration");
  }
}
