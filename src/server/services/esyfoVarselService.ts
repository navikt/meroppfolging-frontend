import { getServerEnv } from '@/constants/envs'
import { exchangeIdportenTokenForSykepengedagerInformasjonTokenx } from '@/auth/tokenUtils'
import { serverRequest } from '@/libs/axios'

import { MaxDateDTO, maxDateSchema } from './schemas/esyfoVarselSchema'

export async function getMaxDate(auth: string): Promise<MaxDateDTO> {
  // const url = getServerEnv().ESYFOVARSEL_MAX_DATE_API_URL
  const url = getServerEnv().SYKEPENGEDAGER_INFORMASJON_MAX_DATE_API_URL
  const tokenx = await exchangeIdportenTokenForSykepengedagerInformasjonTokenx(auth)

  const response = await serverRequest<MaxDateDTO>({ url, accessToken: tokenx })

  const result = maxDateSchema.safeParse(response)

  if (result.success) {
    return result.data
  }

  throw new Error(`Failed to parse response from ${url}: ${JSON.stringify(result.error)}`)
}
