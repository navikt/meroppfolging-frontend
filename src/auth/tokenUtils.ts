import { requestOboToken } from '@navikt/oasis'
import { NextApiRequest } from 'next'

import { getServerEnv, isLocalOrDemo } from '@/constants/envs'

export async function exchangeIdportenTokenForSykepengedagerInformasjonTokenx(
  idportenToken: string | null,
): Promise<string> {
  if (!idportenToken) {
    throw new Error('Mangler idportenToken')
  }

  const SYKEPENGEDAGER_INFORMASJON_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:team-esyfo:sykepengedager-informasjon`

  const tokenxGrant = await requestOboToken(idportenToken, SYKEPENGEDAGER_INFORMASJON_ID)

  if (!tokenxGrant.ok) {
    throw new Error(`Failed to exchange idporten token for SykepengedagerInformasjon tokenx: ${tokenxGrant.error}`)
  }

  return tokenxGrant.token
}

export async function exchangeIdportenTokenForMeroppfolgingBackendTokenx(
  idportenToken: string | null,
): Promise<string> {
  if (!idportenToken) {
    throw new Error('Mangler idportenToken')
  }

  const MEROPPFOLGING_BACKEND_CLIENT_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:team-esyfo:meroppfolging-backend`

  const tokenxGrant = await requestOboToken(idportenToken, MEROPPFOLGING_BACKEND_CLIENT_ID)

  if (!tokenxGrant.ok) {
    throw new Error(`Failed to exchange idporten token for meroppfolging-backend tokenx: ${tokenxGrant.error}`)
  }

  return tokenxGrant.token
}

export async function getIdportenToken(req: NextApiRequest): Promise<string> {
  if (isLocalOrDemo) {
    return 'sometoken'
  }

  const bearerToken = req.headers['authorization']

  if (!bearerToken) {
    throw new Error('Missing idporten token')
  }

  return bearerToken.replace('Bearer ', '')
}
