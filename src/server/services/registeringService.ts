import { NextApiRequest } from 'next'

import { StartRegisteringDTO, startRegisteringSchema } from './schemas/registreringSchema'

import { getServerEnv } from '@/constants/envs'
import { exchangeIdportenTokenForVeilarbregisteringTokenx } from '@/auth/tokenUtils'
import { serverRequst } from '@/libs/axios'

export async function getStartRegistrering(req: NextApiRequest): Promise<StartRegisteringDTO> {
  const url = getServerEnv().VEIARBLREGISTRERING_START_REGISTERING_API_URL
  const tokenx = await exchangeIdportenTokenForVeilarbregisteringTokenx(req)

  const response = await serverRequst<StartRegisteringDTO>(url, tokenx)

  const result = startRegisteringSchema.passthrough().safeParse(response)

  if (result.success) {
    return result.data
  }

  throw new Error(`Failed to parse response from ${url}: ${JSON.stringify(result.error)}`)
}
