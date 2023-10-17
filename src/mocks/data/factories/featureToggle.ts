import { IToggle } from '@unleash/nextjs'

export function createFeatureToggle(overrides?: Partial<IToggle>): IToggle {
  return {
    name: 'disableMerOppfolgingRegistering',
    enabled: false,
    impressionData: false,
    variant: {
      name: 'disabled',
      enabled: false,
    },
    ...overrides,
  }
}
