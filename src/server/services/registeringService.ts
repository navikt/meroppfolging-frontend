import {
  CompleteRegistrationRequest,
  StartRegistrationDTO,
  startRegistrationSchema,
} from './schemas/registreringSchema'

import { getServerEnv } from '@/constants/envs'
import { exchangeIdportenTokenForVeilarbregisteringTokenx } from '@/auth/tokenUtils'
import { serverRequst } from '@/libs/axios'

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

  await serverRequst({ url, accessToken: tokenx, method: 'post', data })
}
