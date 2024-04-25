import { logger } from '@navikt/next-logger'

import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { serverRequest } from '@/libs/axios'
import { getServerEnv } from '@/constants/envs'

import { SenOppfolgingFormRequest, StatusDTO, statusSchema } from './schemas/meroppfolgingSchema'

export async function getStatus(auth: string): Promise<StatusDTO> {
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const path = `${url}/api/v1/senoppfolging/status`
  const tokenx = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth)

  const response = await serverRequest<StatusDTO>({ url: path, accessToken: tokenx })

  const result = statusSchema.safeParse(response)

  if (result.success) {
    return result.data
  }

  throw new Error(`Failed to parse response from ${path}: ${JSON.stringify(result.error)}`)
}

export async function postSenOppfolging(auth: string, data: SenOppfolgingFormRequest): Promise<void> {
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const path = `${url}/api/v1/senoppfolging/submitform`
  const tokenx = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth)

  try {
    await serverRequest({ url: path, accessToken: tokenx, method: 'post', data })
  } catch (e) {
    logger.error(`Failed to submit registration: ${e}. Payload: ${JSON.stringify(data)}`)
    throw new Error(`Failed to submit registration: ${e}`)
  }
}

export async function postVisit(auth: string): Promise<void> {
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const path = `${url}/api/v1/senoppfolging/visit`
  const tokenx = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth)

  try {
    await serverRequest({ url: path, accessToken: tokenx, method: 'post' })
  } catch (e) {
    logger.error(`Failed to post visit: ${e}`)
  }
}
