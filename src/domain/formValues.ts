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

export const formQuestionTitles = {
  [QuestionId.fremtidigSituasjon]: 'Arbeidssituasjon',
  [QuestionId.utdanning]: 'Utdanning',
  [QuestionId.utdanningGodkjent]: 'Utdanning',
  [QuestionId.utdanningBestatt]: 'Utdanning',
  [QuestionId.andreForhold]: 'Andre utfordringer knyttet til arbeid',
  [QuestionId.tilbakeIArbeid]: 'Arbeidssituasjon',
} as const satisfies Record<QuestionId, string>

export const formQuestionTexts = {
  [QuestionId.fremtidigSituasjon]: 'Hva tenker du om din fremtidige situasjon?',
  [QuestionId.utdanning]: 'Hva er din høyeste fullførte utdanning?',
  [QuestionId.utdanningGodkjent]: 'Er utdanningen din godkjent i Norge?',
  [QuestionId.utdanningBestatt]: 'Er utdanningen din bestått?',
  [QuestionId.andreForhold]: 'Er det noe annet enn helsen din som NAV bør ta hensyn til?',
  [QuestionId.tilbakeIArbeid]: 'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?',
} as const satisfies Record<QuestionId, string>

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
