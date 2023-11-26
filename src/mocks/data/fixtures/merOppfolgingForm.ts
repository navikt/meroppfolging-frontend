import { FremtidigSituasjonValues, TilbakeIArbeidValues } from '@/domain/radioValues'

import { createMerOppfolgingFormState } from '../factories/merOppfolgingForm'

export const emptyMerOppfolgingFormState = createMerOppfolgingFormState()
export const partiallyFilledMerOppfolgingFormState = createMerOppfolgingFormState({
  fremtidigSituasjon: FremtidigSituasjonValues.SAMME_ARBEIDSGIVER,
})
export const filledMerOppfolgingFormState = createMerOppfolgingFormState({
  fremtidigSituasjon: FremtidigSituasjonValues.SAMME_ARBEIDSGIVER,
  tilbakeIArbeid: TilbakeIArbeidValues.JA_FULL_STILLING,
})
