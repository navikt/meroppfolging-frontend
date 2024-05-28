import { headers } from 'next/headers'
import { logger } from '@navikt/next-logger'
import { getToken, requestOboToken, validateToken } from '@navikt/oasis'
import { redirect } from 'next/navigation'
import { NextApiRequest } from 'next'

import { isLocalOrDemo } from '@/constants/envs'

export async function verifyUserLoggedIn(): Promise<void> {
  const requestHeaders = headers()

  if (isLocalOrDemo) {
    logger.warn('Is running locally, skipping auth')
    return
  }

  const redirectPath = requestHeaders.get('x-path')
  if (!redirectPath == null) {
    logger.warn("Missing 'x-path' header, is middleware middlewaring?")
  }
  logger.info(`Redirect path is ${redirectPath}`)

  const token = getToken(requestHeaders)
  if (!token) {
    logger.info('Found no token, redirecting to login')
    redirect(`/oauth2/login?redirect=${redirectPath}`)
  }

  const result = await validateToken(token)
  if (!result.ok) {
    if (result.errorType !== 'token expired') {
      logger.error(
        new Error(
          `Invalid JWT token found (${result.errorType}) (cause: ${result.errorType} ${result.error.message}, redirecting to login.`,
          { cause: result.error },
        ),
      )
    }
    redirect(`/oauth2/login?redirect=${redirectPath}`)
  }
}

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
