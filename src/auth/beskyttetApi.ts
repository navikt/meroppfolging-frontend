import { logger } from '@navikt/next-logger'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateIdportenToken } from '@navikt/oasis'
import { AxiosError } from 'axios'

import { isLocalOrDemo } from '@/constants/envs'
import { cleanPathForMetric } from '@/metrics/metrics'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>

export function beskyttetApi(handler: ApiHandler): ApiHandler {
  return async function withBearerTokenHandler(req, res) {
    try {
      if (!isLocalOrDemo) {
        const bearerToken: string | null | undefined = req.headers['authorization']

        if (!bearerToken) {
          return res.status(401).json({ message: 'Access denied' })
        }

        const result = await validateIdportenToken(bearerToken)

        if (!result.ok) {
          logger.warn('kunne ikke validere idportentoken i beskyttetApi')
          return res.status(401).json({ message: 'Access denied' })
        }
      }

      return await handler(req, res)
      // eslint-disable-next-line
    } catch (error: any) {
      if (error instanceof AxiosError && error.response) {
        const responseStatus = error.response.status
        logger.error(
          `${req.method} ${cleanPathForMetric(
            req.url!,
          )} returned Axios Error with status: ${responseStatus}, and message: ${error.message}`,
        )

        if (responseStatus === 401 || responseStatus === 403) {
          res.status(401).json({ message: 'Access denied' })
        }
        res.status(responseStatus).end()
      } else {
        logger.error(`${req.method} ${cleanPathForMetric(req.url!)} returned error message: ${error.message}`)
        res.status(500).end()
      }
    }
  }
}
