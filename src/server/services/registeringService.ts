import { logger } from '@navikt/next-logger'

import { getServerEnv } from '@/constants/envs'
import {
  exchangeIdportenTokenForMeroppfolgingBackendTokenx,
  exchangeIdportenTokenForVeilarbregisteringTokenx,
} from '@/auth/tokenUtils'
import { serverRequst } from '@/libs/axios'

import {
  CompleteRegistrationRequest,
  StartRegistrationDTO,
  startRegistrationSchema,
} from './schemas/registreringSchema'

export async function getStartRegistration(auth: string): Promise<StartRegistrationDTO> {
  const url = getServerEnv().VEIARBLREGISTRERING_START_REGISTRATION_API_URL
  const tokenx = await exchangeIdportenTokenForVeilarbregisteringTokenx(auth)

  const response = await serverRequst<StartRegistrationDTO>({ url, accessToken: tokenx })

  const result = startRegistrationSchema.passthrough().safeParse(response)

  if (result.success) {
    return result.data
  }

  throw new Error(`Failed to parse response from ${url}: ${JSON.stringify(result.error)}`)
}

export async function postCompleteRegistration(auth: string, data: CompleteRegistrationRequest): Promise<void> {
  const url = getServerEnv().VEIARBLREGISTRERING_COMPLETE_REGISTRATION_API_URL
  const tokenx = await exchangeIdportenTokenForVeilarbregisteringTokenx(auth)

  try {
    await serverRequst({ url, accessToken: tokenx, method: 'post', data })
  } catch (e) {
    logger.error(`Failed to complete registration: ${e}. Payload: ${JSON.stringify(data)}`)
    throw new Error(`Failed to complete registration: ${e}`)
  }
}

export async function getMer(auth: string): Promise<void> {
  const url = 'https://meroppfolging-backend.intern.dev.nav.no/api/v1/mer'
  const tokenx = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth)

  try {
    await serverRequst({ url, accessToken: tokenx })
  } catch (e) {
    logger.error(`Failed to complete registration: ${e}}`)
    throw new Error(`Failed: ${e}`)
  }
}
