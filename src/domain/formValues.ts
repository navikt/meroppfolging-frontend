import { merOppfolgingRadioAlt } from './radioValues'

import { MerOppfolgingFormState, QuestionId } from '@/types/merOppfolgingForm'

export const defaultFormValues: MerOppfolgingFormState = {
  [QuestionId.fremtidigSituasjon]: null,
  [QuestionId.utdanning]: null,
  [QuestionId.utdanningGodkjent]: null,
  [QuestionId.utdanningBestatt]: null,
  [QuestionId.andreForhold]: null,
  [QuestionId.tilbakeIArbeid]: null,
}

export const merOppfolgingFormAlt = { ...merOppfolgingRadioAlt } as const

export function createFormValueState(state: MerOppfolgingFormState) {
  return (form: keyof MerOppfolgingFormState) => {
    switch (form) {
      case QuestionId.fremtidigSituasjon: {
        const value = state[form]
        return value ? merOppfolgingFormAlt[form][value] : null
      }
      case QuestionId.tilbakeIArbeid: {
        const value = state[form]
        return value ? merOppfolgingFormAlt[form][value] : null
      }
      case QuestionId.utdanning: {
        const value = state[form]
        return value ? merOppfolgingFormAlt[form][value] : null
      }
      case QuestionId.utdanningGodkjent: {
        const value = state[form]
        return value ? merOppfolgingFormAlt[form][value] : null
      }
      case QuestionId.utdanningBestatt: {
        const value = state[form]
        return value ? merOppfolgingFormAlt[form][value] : null
      }
      case QuestionId.andreForhold: {
        const value = state[form]
        return value ? merOppfolgingFormAlt[form][value] : null
      }
    }
  }
}
