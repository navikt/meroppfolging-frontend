import { logger } from '@navikt/next-logger'
import type { NextApiRequest } from 'next'

import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { serverRequest } from '@/libs/axios'
import { getServerEnv } from '@/constants/envs'
import { getBearerToken } from '@/auth/authentication'
import { SenOppfolgingDTOV2 } from '@/server/services/schemas/submitFormSchemaV2'

import { SenOppfolgingFormRequest, StatusDTO, statusSchema } from './schemas/meroppfolgingSchema'
import { SenOppfolgingStatusDTOV2, SenOppfolgingStatusDTOV2Schema } from './schemas/statusSchemaV2'

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

export async function getStatusV2(req: NextApiRequest): Promise<SenOppfolgingStatusDTOV2> {
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const clientId = getServerEnv().MEROPPFOLGING_BACKEND_CLIENT_ID
  const tokenX = await getBearerToken(req, clientId)
  const path = `${url}/api/v2/senoppfolging/status`

  const response = await serverRequest<SenOppfolgingStatusDTOV2>({ url: path, accessToken: tokenX })

  const result = SenOppfolgingStatusDTOV2Schema.safeParse(response)

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

export async function postSenOppfolgingV2(req: NextApiRequest): Promise<void> {
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const clientId = getServerEnv().MEROPPFOLGING_BACKEND_CLIENT_ID
  const tokenX = await getBearerToken(req, clientId)
  const path = `${url}/api/v2/senoppfolging/submitform`
  const data: SenOppfolgingDTOV2 = req.body

  try {
    await serverRequest({ url: path, accessToken: tokenX, method: 'post', data })
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
