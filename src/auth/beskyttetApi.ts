import { logger } from '@navikt/next-logger'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, validateIdportenToken } from '@navikt/oasis'

import { isLocalOrDemo } from '@/constants/envs'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>

export function beskyttetApi(handler: ApiHandler): ApiHandler {
  return async function withBearerTokenHandler(req, res) {
    if (isLocalOrDemo) {
      return handler(req, res)
    }

    const token = getToken(req)
    if (!token) {
      return res.status(401).json({ message: 'Access denied' })
    }

    const result = await validateIdportenToken(token)
    if (!result.ok) {
      logger.warn('kunne ikke validere idportentoken i beskyttetApi')
      return res.status(401).json({ message: 'Access denied' })
    }

    return handler(req, res)
  }
}
