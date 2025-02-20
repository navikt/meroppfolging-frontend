'use server'

import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { serverRequest } from '@/libs/axios'
import { logger } from '@navikt/next-logger'
import { headers } from 'next/headers'
import { getToken } from '@navikt/oasis'
import { FormRequest } from '@/server/schemas/formRequestSchema'
import { validateIdPortenToken } from '@/auth/getIdPortenToken'
import { navigateToLogin } from '@/auth/navigateToLogin'

export async function submitForm(formRequest: FormRequest): Promise<void> {
  if (isLocalOrDemo) {
    return Promise.resolve()
  }
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const path = `${url}/api/v2/senoppfolging/submitform`
  const headersList = await headers()
  const isAuthenticated = await validateIdPortenToken()
  if (!isAuthenticated) {
    navigateToLogin()
  }
  const idportenToken = getToken(headersList)
  const exchangedToken = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken)

  try {
    await serverRequest({ url: path, accessToken: exchangedToken, method: 'post', data: formRequest })
  } catch (e) {
    logger.error(`Failed to submit registration: ${e}. Payload: ${JSON.stringify(formRequest)}`)
    throw new Error(`Failed to submit registration: ${e}`)
  }
}
