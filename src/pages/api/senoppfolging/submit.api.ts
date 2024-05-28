import type { NextApiRequest, NextApiResponse } from 'next'

import { beskyttetApi } from '@/auth/beskyttetApi'
import { isLocalOrDemo } from '@/constants/envs'
import { postSenOppfolgingV2 } from '@/server/services/meroppfolgingService'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (isLocalOrDemo) {
    res.status(200)
  } else {
    await postSenOppfolgingV2(req)
    res.status(200)
  }
}

export default beskyttetApi(handler)
