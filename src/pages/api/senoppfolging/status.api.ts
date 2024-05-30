import type { NextApiRequest, NextApiResponse } from 'next'

import { isLocalOrDemo } from '@/constants/envs'
import { beskyttetApi } from '@/auth/beskyttetApi'
import { getStatusV2 } from '@/server/services/meroppfolgingService'
import { senOppfolgingStatusDTOV2Fixture } from '@/mocks/data/fixtures/senOppfolgingStatusDTOV2Fixture'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (isLocalOrDemo) {
    res.status(200).json(senOppfolgingStatusDTOV2Fixture)
  } else {
    const status = await getStatusV2(req)
    res.status(200).json(status)
  }
}

export default beskyttetApi(handler)
