import { logger } from '@navikt/next-logger'
import { IToggle, evaluateFlags } from '@unleash/nextjs'

import { getAndValidateDefinitions, getFallbackToggles } from '@/libs/unleash/utils'

export async function getFeatureToggles(): Promise<IToggle[]> {
  try {
    const definitions = await getAndValidateDefinitions()
    const { toggles } = evaluateFlags(definitions)

    return toggles
  } catch (e) {
    logger.error(`Failed to get feature toggles from unleash: ${e}. Falling back to default toggles.`)
    return getFallbackToggles()
  }
}
