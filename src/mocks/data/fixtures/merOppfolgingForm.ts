import { createMerOppfolgingFormState } from '../factories/merOppfolgingForm'

import { FremtidigSituasjonValues, TilbakeIArbeidValues } from '@/domain/radioValues'

export const emptyMerOppfolgingFormState = createMerOppfolgingFormState()
export const partiallyFilledMerOppfolgingFormState = createMerOppfolgingFormState({
  fremtidigSituasjon: FremtidigSituasjonValues.SAMME_ARBEIDSGIVER,
})
export const filledMerOppfolgingFormState = createMerOppfolgingFormState({
  fremtidigSituasjon: FremtidigSituasjonValues.SAMME_ARBEIDSGIVER,
  tilbakeIArbeid: TilbakeIArbeidValues.JA_FULL_STILLING,
})
