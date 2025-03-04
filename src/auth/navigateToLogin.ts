import { logger } from '@navikt/next-logger'
import { BASE_PATH } from '@/constants/appConstants'
import { NextResponse } from 'next/server'

export const navigateToLogin = () => {
  logger.info('User is not authenticated. Redirecting to login page')
  const redirectUrl = new URL(`${BASE_PATH}/oauth2/login`)
  redirectUrl.searchParams.set('redirect', `${BASE_PATH}/snart-slutt-pa-sykepengene`)
  NextResponse.redirect(redirectUrl)
}
