import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { serverRequst } from '@/libs/axios'
import { getServerEnv } from '@/constants/envs'

import { SykmeldtDTO, sykmeldtSchema } from './schemas/meroppfolgingSchema'

export async function getSykmeldt(auth: string): Promise<boolean> {
  const url = getServerEnv().MEROPPFOLGING_SYKMELDT_API_URL
  const tokenx = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth)

  const response = await serverRequst<SykmeldtDTO>({ url, accessToken: tokenx })

  const result = sykmeldtSchema.safeParse(response)

  if (result.success) {
    return result.data
  }

  throw new Error(`Failed to parse response from ${url}: ${JSON.stringify(result.error)}`)
}
