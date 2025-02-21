'use server'

import { SenOppfolgingStatusDTO, SenOppfolgingStatusSchema } from '@/server/schemas/statusSchema'
import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import * as statusDtoFixtures from '@/mocks/data/fixtures/statusDtoFixtures'
import { logger } from '@navikt/next-logger'
import { fetchFromMobe } from '@/server/actions/fetch'

export async function senOppfolgingStatus(): Promise<SenOppfolgingStatusDTO> {
  if (isLocalOrDemo) {
    return statusDtoFixtures.IkkeSvart
  }

  const endpoint = `${getServerEnv().MEROPPFOLGING_BACKEND_URL}/api/v2/senoppfolging/status`
  const response = await fetchFromMobe(endpoint)

  if (!response.ok) {
    logger.error(`Failed to fetch data from ${endpoint}: ${response.statusText}`)
    throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`)
  }

  const data = await response.json()
  const parsed = SenOppfolgingStatusSchema.safeParse(data)

  if (!parsed.success) {
    logger.error('Failed to parse reponse ' + parsed.error)
    throw parsed.error
  }

  return parsed.data
}
