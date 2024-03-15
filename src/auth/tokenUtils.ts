import { grantTokenXOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall'

import { getServerEnv } from '@/constants/envs'

export async function exchangeIdportenTokenForVeilarbregisteringTokenx(auth: string): Promise<string> {
  const VEILARBREGISTRERING_CLIENT_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:paw:veilarbregistrering`

  const tokenxGrant = await grantTokenXOboToken(auth, VEILARBREGISTRERING_CLIENT_ID)

  if (isInvalidTokenSet(tokenxGrant)) {
    throw new Error(`Failed to exchange idporten token for veilarbtokenx: ${tokenxGrant.message}`)
  }

  return tokenxGrant
}

export async function exchangeIdportenTokenForEsyfoVarselTokenx(auth: string): Promise<string> {
  const ESYFO_VARSEL_CLIENT_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:team-esyfo:esyfovarsel`

  const tokenxGrant = await grantTokenXOboToken(auth, ESYFO_VARSEL_CLIENT_ID)

  if (isInvalidTokenSet(tokenxGrant)) {
    throw new Error(`Failed to exchange idporten token for esyfovarseltokenx: ${tokenxGrant.message}`)
  }

  return tokenxGrant
}

export async function exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth: string): Promise<string> {
  const MEROPPFOLGING_BACKEND_CLIENT_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:team-esyfo:meroppfolging-backend`

  const tokenxGrant = await grantTokenXOboToken(auth, MEROPPFOLGING_BACKEND_CLIENT_ID)

  if (isInvalidTokenSet(tokenxGrant)) {
    throw new Error(`Failed to exchange idporten token for meroppfolging-backend tokenx: ${tokenxGrant.message}`)
  }

  return tokenxGrant
}
