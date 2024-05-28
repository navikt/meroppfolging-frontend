import { getToken, requestOboToken } from '@navikt/oasis'
import { NextApiRequest } from 'next'

import { isLocalOrDemo } from '@/constants/envs'

export async function getBearerToken(req: NextApiRequest, backendClientId: string): Promise<string> {
  if (isLocalOrDemo) return 'fake-token'

  const idportenToken = getToken(req)

  if (!idportenToken) {
    throw new Error('Mangler authorization header')
  }
  const tokenX = await requestOboToken(idportenToken, backendClientId)
  if (!tokenX.ok) {
    throw new Error(`Unable to exchange token for ${backendClientId} token, reason: ${tokenX.error.message}`, {
      cause: tokenX.error,
    })
  }
  return tokenX.token
}
