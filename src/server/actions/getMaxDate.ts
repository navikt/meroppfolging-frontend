import { MaxDateDTO, maxDateSchema } from '@/server/schemas/sykepengedagerInformasjonSchema'
import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import { exchangeIdportenTokenForSykepengedagerInformasjonTokenx } from '@/auth/tokenUtils'
import { headers } from 'next/headers'
import { getToken } from '@navikt/oasis'
import { maxDateDTO } from '@/mocks/data/fixtures/sykepengedagerInformasjonDTO'
import { nanoid } from 'nanoid'
import { validateIdPortenToken } from '@/auth/getIdPortenToken'
import { navigateToLogin } from '@/auth/navigateToLogin'

export async function getMaxDate(): Promise<MaxDateDTO> {
  if (isLocalOrDemo) {
    return maxDateDTO
  }

  const endpoint = `${getServerEnv().SYKEPENGEDAGER_INFORMASJON_MAX_DATE_API_URL}?isoformat=true`
  const headersList = await headers()
  const isAuthenticated = await validateIdPortenToken()
  if (!isAuthenticated) {
    navigateToLogin()
  }
  const idportenToken = getToken(headersList)
  const exchangedToken = await exchangeIdportenTokenForSykepengedagerInformasjonTokenx(idportenToken)
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${exchangedToken}`,
      'Nav-Consumer-Id': 'meroppfolging-frontend',
      'Nav-Call-Id': nanoid(),
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`)
  }

  const data = await response.json()
  const result = maxDateSchema.safeParse(data)

  if (result.success) {
    return result.data
  }

  throw new Error(`Failed to parse response from ${endpoint}: ${JSON.stringify(result.error)}`)
}
