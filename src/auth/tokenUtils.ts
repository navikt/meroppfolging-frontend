import { logger } from "@navikt/next-logger";
import { requestOboToken } from "@navikt/oasis";
import type { NextApiRequest } from "next";
import { getServerEnv, isLocalOrDemo } from "@/constants/envs";
import {
  RuntimeErrorCode,
  TokenxOboExchangeContext,
  type TokenxTargetUpstream,
} from "@/constants/runtimeErrorContract";
import { transportFailureDiagnostics } from "@/server/observability/failureDiagnostics";

export async function exchangeIdportenTokenForSykepengedagerInformasjonTokenx(
  idportenToken: string | null,
): Promise<string> {
  if (!idportenToken) {
    throw new Error("Mangler idportenToken");
  }

  const SYKEPENGEDAGER_INFORMASJON_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:team-esyfo:sykepengedager-informasjon`;

  return exchangeToken(
    idportenToken,
    SYKEPENGEDAGER_INFORMASJON_ID,
    "sykepengedager-informasjon",
  );
}

export async function exchangeIdportenTokenForMeroppfolgingBackendTokenx(
  idportenToken: string | null,
): Promise<string> {
  if (!idportenToken) {
    throw new Error("Mangler idportenToken");
  }

  const MEROPPFOLGING_BACKEND_CLIENT_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:team-esyfo:meroppfolging-backend`;

  return exchangeToken(
    idportenToken,
    MEROPPFOLGING_BACKEND_CLIENT_ID,
    "meroppfolging-backend",
  );
}

export async function getIdportenToken(req: NextApiRequest): Promise<string> {
  if (isLocalOrDemo) {
    return "sometoken";
  }

  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new Error("Missing idporten token");
  }

  return bearerToken.replace("Bearer ", "");
}

async function exchangeToken(
  token: string,
  audience: string,
  upstream: TokenxTargetUpstream,
): Promise<string> {
  try {
    const grant = await requestOboToken(token, audience);
    if (!grant.ok) throw grant.error;
    return grant.token;
  } catch (error) {
    const diagnostics = transportFailureDiagnostics(error);
    logger.error(
      {
        ...diagnostics,
        ...TokenxOboExchangeContext,
        failure_kind: "token",
        error_code:
          diagnostics.error_code ?? RuntimeErrorCode.TOKENX_OBO_EXCHANGE_ERROR,
        failure_stage: "token_exchange",
        upstream,
      },
      "Kunne ikke hente tilgangstoken til tjenesten",
    );
    // This error crosses the Next server boundary: never attach token/client objects.
    throw new Error("TokenX OBO exchange failed");
  }
}
