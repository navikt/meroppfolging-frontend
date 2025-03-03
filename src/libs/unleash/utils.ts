import { difference } from 'remeda'
import { logger } from '@navikt/next-logger'
import { IToggle, getDefinitions } from '@unleash/nextjs'

import { browserEnv, getServerEnv } from '@/constants/envs'

import { EXPECTED_TOGGLES } from './toggles'

/**
 * If there are any toggles defined in EXPECTED_TOGGLES that are not returned by Unleash, something is out of sync.
 */
export async function getAndValidateDefinitions(): Promise<ReturnType<typeof getDefinitions>> {
  const definitions = await getDefinitions({ url: `${getServerEnv().UNLEASH_SERVER_API_URL}/api/client/features` })
  const diff = difference(
    EXPECTED_TOGGLES,
    definitions.features.map(({ name }) => name),
  )

  if (diff.length > 0) {
    logger.error(`Difference in expected toggles and toggles in unleash, diff: ${diff.join(', ')}`)
  }

  return definitions
}

export function getDefaultToggleValues(name: string): IToggle {
  return {
    name,
    enabled: false,
    impressionData: false,
    variant: { name: 'disabled', enabled: false },
  }
}

export function getFallbackToggles(): IToggle[] {
  return EXPECTED_TOGGLES.map(getDefaultToggleValues)
}

export function getUnleashEnvironment(): 'development' | 'production' {
  switch (browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT) {
    case 'prod':
      return 'production'
    default:
      return 'development'
  }
}
