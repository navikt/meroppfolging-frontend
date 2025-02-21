import { headers } from 'next/headers'
import { validateIdPortenToken } from '@/auth/getIdPortenToken'
import { navigateToLogin } from '@/auth/navigateToLogin'
import { getToken } from '@navikt/oasis'
import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { nanoid } from 'nanoid'

export async function fetchFromMobe(url: string): Promise<Response> {
  const headersList = await headers()
  const isAuthenticated = await validateIdPortenToken()
  if (!isAuthenticated) {
    navigateToLogin()
  }
  const idportenToken = getToken(headersList)
  const exchangedToken = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(idportenToken)
  return await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${exchangedToken}`,
      'Nav-Consumer-Id': 'meroppfolging-frontend',
      'Nav-Call-Id': nanoid(),
      'Content-Type': 'application/json',
    },
  })
}
