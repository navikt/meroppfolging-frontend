import { logger } from '@navikt/next-logger'
import { getToken, validateIdportenToken } from '@navikt/oasis'
import { headers } from 'next/headers'

export const validateIdPortenToken = async (): Promise<Boolean> => {
  const headersList = await headers()
  const idportenToken = getToken(headersList)

  if (!idportenToken) {
    logger.warn('Missing idporten token')
    return false
  }

  const validationResult = await validateIdportenToken(idportenToken)
  if (!validationResult.ok) {
    logger.warn(`Invalid JWT token found, cause: ${validationResult.errorType} ${validationResult.error}`)
    return false
  }

  return true
}
