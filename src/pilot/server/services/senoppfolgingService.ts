import { logger } from '@navikt/next-logger'

import { getServerEnv } from '@/constants/envs'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { serverRequest } from '@/libs/axios'
import { FormRequest } from '@/pilot/server/services/schemas/formRequestSchema'

export async function postForm(auth: string, data: FormRequest): Promise<void> {
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const path = `${url}/api/v2/senoppfolging/submitform`
  const tokenx = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth)

  try {
    await serverRequest({ url: path, accessToken: tokenx, method: 'post', data })
  } catch (e) {
    logger.error(`Failed to submit registration: ${e}. Payload: ${JSON.stringify(data)}`)
    throw new Error(`Failed to submit registration: ${e}`)
  }
}
