import { NextApiRequest } from 'next'
import { grantTokenXOboToken, isInvalidTokenSet } from '@navikt/next-auth-wonderwall'

import { getServerEnv } from '@/constants/envs'

async function getIdportenTokenFromRequest(req: NextApiRequest): Promise<string> {
  const bearerToken = req.headers['authorization']

  if (!bearerToken) {
    throw new Error(`Failed to get bearer token from request header`)
  }

  return bearerToken
}

export async function exchangeIdportenTokenForVeilarbregisteringTokenx(req: NextApiRequest): Promise<string> {
  const idportenToken = await getIdportenTokenFromRequest(req)
  const VEILARBREGISTRERING_CLIENT_ID = `${getServerEnv().NAIS_CLUSTER_NAME}:paw:veilarbregistrering`

  const tokenxGrant = await grantTokenXOboToken(idportenToken, VEILARBREGISTRERING_CLIENT_ID)

  if (isInvalidTokenSet(tokenxGrant)) {
    throw new Error(`Failed to exchange idporten token for veilarbtokenx: ${tokenxGrant.message}`)
  }

  return tokenxGrant
}
