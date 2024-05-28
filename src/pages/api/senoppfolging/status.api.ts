import type { NextApiRequest, NextApiResponse } from 'next'

import { isLocalOrDemo } from '@/constants/envs'
import { beskyttetApi } from '@/auth/beskyttetApi'
import { SenOppfolgingStatusDTOV2 } from '@/server/services/schemas/statusSchemaV2'
import { getStatusV2 } from '@/server/services/meroppfolgingService'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (isLocalOrDemo) {
    const mockStatus: SenOppfolgingStatusDTOV2 = {
      isPilot: true,
      responseStatus: 'TRENGER_OPPFOLGING',
    }
    res.status(200).json(mockStatus)
  } else {
    const status = await getStatusV2(req)
    res.status(200).json(status)
  }
}

export default beskyttetApi(handler)
