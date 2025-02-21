import { MaxDateDTO, maxDateSchema } from '@/server/schemas/sykepengedagerInformasjonSchema'
import { getServerEnv, isLocalOrDemo } from '@/constants/envs'
import { maxDateDTO } from '@/mocks/data/fixtures/sykepengedagerInformasjonDTO'
import { fetchFromMobe } from '@/server/actions/fetch'
import { logger } from '@navikt/next-logger'

export async function getMaxDate(): Promise<MaxDateDTO> {
  if (isLocalOrDemo) {
    return maxDateDTO
  }

  const endpoint = `${getServerEnv().SYKEPENGEDAGER_INFORMASJON_MAX_DATE_API_URL}?isoformat=true`
  const response = await fetchFromMobe(endpoint)

  if (!response.ok) {
    logger.error(`Failed to fetch data from ${endpoint}: ${response.statusText}`)
    throw new Error(`Failed to fetch data from ${endpoint}: ${response.statusText}`)
  }

  const data = await response.json()
  const parsed = maxDateSchema.safeParse(data)

  if (!parsed.success) {
    logger.error('Failed to parse reponse ' + parsed.error)
    throw parsed.error
  }

  return parsed.data
}
