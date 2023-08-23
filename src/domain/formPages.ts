import { invert } from 'remeda'

import { FormPage, FormSummaryPages, QuestionId } from '@/types/merOppfolgingForm'

export const formPage = {
  ['0']: QuestionId.fremtidigSituasjon,
  ['1']: QuestionId.utdanning,
  ['2']: QuestionId.utdanningGodkjent,
  ['3']: QuestionId.utdanningBestatt,
  ['4']: QuestionId.andreForhold,
  ['5']: QuestionId.tilbakeIArbeid,
  ['6']: FormSummaryPages.summary,
  ['7']: FormSummaryPages.backToWork,
} as const satisfies Record<string, FormPage>

export const formPageInverted = invert(formPage)

export const INITIAL_FORM_PAGE = QuestionId.fremtidigSituasjon
