import { getToken } from "@navikt/oasis";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { validateIdPortenToken } from "@/auth/getIdPortenToken";
import { navigateToLogin } from "@/auth/navigateToLogin";
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from "@/auth/tokenUtils";
import { getServerEnv, isLocalOrDemo } from "@/constants/envs";
import { RuntimeErrorContext } from "@/constants/runtimeErrorContract";
import * as statusDtoFixtures from "@/mocks/data/fixtures/statusDtoFixtures";
import { fetchValidatedJson } from "@/server/fetch/fetchValidatedJson";
import {
  type SenOppfolgingStatusDTO,
  SenOppfolgingStatusSchema,
} from "@/server/schemas/statusSchema";

export async function senOppfolgingStatus(): Promise<SenOppfolgingStatusDTO> {
  if (isLocalOrDemo) {
    return statusDtoFixtures.IkkeSvart;
  }

  const endpoint = `${getServerEnv().MEROPPFOLGING_BACKEND_URL}/api/v2/senoppfolging/status`;
  const headersList = await headers();
  const isAuthenticated = await validateIdPortenToken();
  if (!isAuthenticated) {
    navigateToLogin();
  }
  const idportenToken = getToken(headersList);
  const exchangedToken =
    await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken);
  return fetchValidatedJson({
    context: RuntimeErrorContext.SEN_OPPFOLGING_STATUS_FETCH,
    endpoint,
    errorMessage: "Failed to fetch sen oppfolging status",
    headers: {
      Authorization: `Bearer ${exchangedToken}`,
      "Nav-Consumer-Id": "meroppfolging-frontend",
      "Nav-Call-Id": nanoid(),
      "Content-Type": "application/json",
    },
    schema: SenOppfolgingStatusSchema,
  });
}
