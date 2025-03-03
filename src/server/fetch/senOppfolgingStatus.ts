import { SenOppfolgingStatusDTO, SenOppfolgingStatusSchema } from '@/server/schemas/statusSchema'
import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import { headers } from 'next/headers'
import { getToken } from '@navikt/oasis'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import * as statusDtoFixtures from '@/mocks/data/fixtures/statusDtoFixtures'
import { nanoid } from 'nanoid'
import { validateIdPortenToken } from '@/auth/getIdPortenToken'
import { navigateToLogin } from '@/auth/navigateToLogin'
import { logger } from '@navikt/next-logger'

export async function senOppfolgingStatus(): Promise<SenOppfolgingStatusDTO> {
  if (isLocalOrDemo) {
    return statusDtoFixtures.IkkeSvart
  }

  const endpoint = `${getServerEnv().MEROPPFOLGING_BACKEND_URL}/api/v2/senoppfolging/status`
  const headersList = await headers()
  const isAuthenticated = await validateIdPortenToken()
  if (!isAuthenticated) {
    navigateToLogin()
  }
  const idportenToken = getToken(headersList)
  const exchangedToken = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken)
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
    logger.error(`Failed to fetch data from ${endpoint}: ${response.statusText}`)
    throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`)
  }

  const data = await response.json()
  const parsed = SenOppfolgingStatusSchema.safeParse(data)

  if (!parsed.success) {
    logger.error('Failed to parse result! ' + parsed.error)
    throw parsed.error
  }

  return parsed.data
}
