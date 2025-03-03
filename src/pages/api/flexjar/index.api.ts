import { NextApiRequest, NextApiResponse } from 'next'
import { requestOboToken } from '@navikt/oasis'
import { logger } from '@navikt/next-logger'

import { beskyttetApi } from '@/auth/beskyttetApi'
import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import { getIdportenToken } from '@/auth/tokenUtils'
import { serverRequest } from '@/libs/axios'
import { OpprettFeedbackData } from '@/components/Flexjar/queryhooks/useOpprettFlexjarFeedback'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (isLocalOrDemo) {
    return res.status(200).json({ id: '123' })
  }

  const { FLEXJAR_BACKEND_CLIENT_ID, FLEXJAR_HOST } = getServerEnv()
  const idportenToken = await getIdportenToken(req)
  const data: OpprettFeedbackData = req.body
  const url = FLEXJAR_HOST + '/api/v2/feedback'

  const tokenX = await requestOboToken(idportenToken, FLEXJAR_BACKEND_CLIENT_ID)
  if (!tokenX.ok) {
    logger.error(`Unable to exchange token for ${FLEXJAR_BACKEND_CLIENT_ID}, reason: ${tokenX.error.message}`)
    return res.status(403).json({ message: 'Forbidden' })
  }

  const id = await serverRequest({ url, method: 'post', data, accessToken: tokenX.token })

  return res.status(200).json(id)
}

export default beskyttetApi(handler)
