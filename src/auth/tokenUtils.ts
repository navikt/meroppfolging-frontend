import { requestOboToken } from '@navikt/oasis'

import { getServerEnv } from '@/constants/envs'

export async function exchangeIdportenTokenForVeilarbregisteringTokenx(auth: string): Promise<string> {
  const VEILARBREGISTRERING_CLIENT_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:paw:veilarbregistrering`

  const tokenxGrant = await requestOboToken(auth, VEILARBREGISTRERING_CLIENT_ID)

  if (!tokenxGrant.ok) {
    throw new Error(`Failed to exchange idporten token for veilarbtokenx: ${tokenxGrant.error}`)
  }

  return tokenxGrant.token
}

export async function exchangeIdportenTokenForEsyfoVarselTokenx(auth: string): Promise<string> {
  const ESYFO_VARSEL_CLIENT_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:team-esyfo:esyfovarsel`

  const tokenxGrant = await requestOboToken(auth, ESYFO_VARSEL_CLIENT_ID)

  if (!tokenxGrant.ok) {
    throw new Error(`Failed to exchange idporten token for esyfovarseltokenx: ${tokenxGrant.error}`)
  }

  return tokenxGrant.token
}

export async function exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth: string): Promise<string> {
  const MEROPPFOLGING_BACKEND_CLIENT_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:team-esyfo:meroppfolging-backend`

  const tokenxGrant = await requestOboToken(auth, MEROPPFOLGING_BACKEND_CLIENT_ID)

  if (!tokenxGrant.ok) {
    throw new Error(`Failed to exchange idporten token for meroppfolging-backend tokenx: ${tokenxGrant.error}`)
  }

  return tokenxGrant.token
}
