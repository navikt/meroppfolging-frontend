import { initialize } from 'unleash-client'
import { FeatureInterface } from 'unleash-client/lib/feature'

import { getServerEnv } from '@/constants/envs'

const unleash = initialize({
  url: `${getServerEnv().UNLEASH_SERVER_API_URL}/api`,
  appName: 'meroppfolging-frontend',
  customHeaders: { Authorization: getServerEnv().UNLEASH_SERVER_API_TOKEN },
})

export function getFeatureToggles(): FeatureInterface[] {
  return unleash.getFeatureToggleDefinitions()
}
