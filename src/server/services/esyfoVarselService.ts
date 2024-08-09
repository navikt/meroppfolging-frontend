import { getServerEnv } from '@/constants/envs'
import { exchangeIdportenTokenForEsyfoVarselTokenx } from '@/auth/tokenUtils'
import { serverRequest } from '@/libs/axios'

import { MaxDateDTO, maxDateSchema } from './schemas/esyfoVarselSchema'

export async function getMaxDate(auth: string): Promise<MaxDateDTO> {
  const url = `${getServerEnv().ESYFOVARSEL_MAX_DATE_API_URL}?isoformat=true`
  const tokenx = await exchangeIdportenTokenForEsyfoVarselTokenx(auth)

  const response = await serverRequest<MaxDateDTO>({ url, accessToken: tokenx })

  const result = maxDateSchema.safeParse(response)

  if (result.success) {
    return result.data
  }

  throw new Error(`Failed to parse response from ${url}: ${JSON.stringify(result.error)}`)
}
