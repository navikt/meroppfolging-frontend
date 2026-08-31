import { getToken } from "@navikt/oasis";
import { nanoid } from "nanoid";
import { headers } from "next/headers";
import { validateIdPortenToken } from "@/auth/getIdPortenToken";
import { navigateToLogin } from "@/auth/navigateToLogin";
import { exchangeIdportenTokenForSykepengedagerInformasjonTokenx } from "@/auth/tokenUtils";
import { getServerEnv, isLocalOrDemo } from "@/constants/envs";
import { RuntimeErrorContext } from "@/constants/runtimeErrorContract";
import { maxDateDTO } from "@/mocks/data/fixtures/sykepengedagerInformasjonDTO";
import { fetchValidatedJson } from "@/server/fetch/fetchValidatedJson";
import {
  type MaxDateDTO,
  maxDateSchema,
} from "@/server/schemas/sykepengedagerInformasjonSchema";

export async function getMaxDate(): Promise<MaxDateDTO> {
  if (isLocalOrDemo) {
    return maxDateDTO;
  }

  const endpoint = `${getServerEnv().SYKEPENGEDAGER_INFORMASJON_MAX_DATE_API_URL}?isoformat=true`;
  const headersList = await headers();
  const isAuthenticated = await validateIdPortenToken();
  if (!isAuthenticated) {
    navigateToLogin();
  }
  const idportenToken = getToken(headersList);
  const exchangedToken =
    await exchangeIdportenTokenForSykepengedagerInformasjonTokenx(
      idportenToken,
    );
  return fetchValidatedJson({
    context: RuntimeErrorContext.MAKSDATO_FETCH,
    endpoint,
    errorMessage: "Failed to fetch maksdato",
    headers: {
      Authorization: `Bearer ${exchangedToken}`,
      "Nav-Consumer-Id": "meroppfolging-frontend",
      "Nav-Call-Id": nanoid(),
      "Content-Type": "application/json",
    },
    schema: maxDateSchema,
  });
}
