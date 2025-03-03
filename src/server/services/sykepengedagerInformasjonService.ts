import { getServerEnv } from '@/constants/envs'
import { exchangeIdportenTokenForSykepengedagerInformasjonTokenx } from '@/auth/tokenUtils'
import { serverRequest } from '@/libs/axios'

import { MaxDateDTO, maxDateSchema } from './schemas/sykepengedagerInformasjonSchema'

export async function getMaxDate(auth: string): Promise<MaxDateDTO> {
  const url = `${getServerEnv().SYKEPENGEDAGER_INFORMASJON_MAX_DATE_API_URL}?isoformat=true`
  const tokenx = await exchangeIdportenTokenForSykepengedagerInformasjonTokenx(auth)

  const response = await serverRequest<MaxDateDTO>({ url, accessToken: tokenx })

  const result = maxDateSchema.safeParse(response)

  if (result.success) {
    return result.data
  }

  throw new Error(`Failed to parse response from ${url}: ${JSON.stringify(result.error)}`)
}
