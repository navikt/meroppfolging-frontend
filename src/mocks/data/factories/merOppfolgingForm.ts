import { defaultFormValues } from '@/domain/formValues'
import { MerOppfolgingFormState } from '@/types/merOppfolgingForm'

export function createMerOppfolgingFormState(overrides?: Partial<MerOppfolgingFormState>): MerOppfolgingFormState {
  return {
    ...defaultFormValues,
    ...overrides,
  }
}
