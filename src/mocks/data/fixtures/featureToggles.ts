import { createFeatureToggle } from '@/mocks/data/factories/featureToggle'

export const disabledFeatureToggles = [createFeatureToggle()]

export const enabledFeatureToggles = [createFeatureToggle({ enabled: true })]
