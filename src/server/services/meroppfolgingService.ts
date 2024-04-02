import { logger } from '@navikt/next-logger'

import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { serverRequst } from '@/libs/axios'
import { getServerEnv } from '@/constants/envs'

import { CompleteRegistrationRequest, StatusDTO, statusSchema } from './schemas/meroppfolgingSchema'

export async function getStatus(auth: string): Promise<StatusDTO> {
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const path = `${url}/api/v1/senoppfolging/status`
  const tokenx = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth)

  const response = await serverRequst<StatusDTO>({ url: path, accessToken: tokenx })

  const result = statusSchema.safeParse(response)

  if (result.success) {
    return result.data
  }

  throw new Error(`Failed to parse response from ${path}: ${JSON.stringify(result.error)}`)
}

export async function postSubmitSenOppfolging(auth: string, data: CompleteRegistrationRequest): Promise<void> {
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const path = `${url}/api/v1/senoppfolging/submit`
  const tokenx = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth)

  try {
    await serverRequst({ url: path, accessToken: tokenx, method: 'post', data })
  } catch (e) {
    logger.error(`Failed to submit registration: ${e}. Payload: ${JSON.stringify(data)}`)
    throw new Error(`Failed to submit registration: ${e}`)
  }
}
