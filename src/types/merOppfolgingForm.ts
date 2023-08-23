import {
  AndreForholdValues,
  FremtidigSituasjonValues,
  TilbakeIArbeidValues,
  UtdanningBestattValues,
  UtdanningGodkjentValues,
  UtdanningValues,
} from '@/domain/radioValues'

export enum QuestionId {
  fremtidigSituasjon = 'fremtidigSituasjon',
  utdanning = 'utdanning',
  utdanningGodkjent = 'utdanningGodkjent',
  utdanningBestatt = 'utdanningBestatt',
  andreForhold = 'andreForhold',
  tilbakeIArbeid = 'tilbakeIArbeid',
}

export enum FormSummaryPages {
  summary = 'summary',
  backToWork = 'backToWork',
}

export type FormPage = QuestionId | FormSummaryPages

export type MerOppfolgingForm = {
  [QuestionId.fremtidigSituasjon]: FremtidigSituasjonValues
  [QuestionId.utdanning]: UtdanningValues
  [QuestionId.utdanningGodkjent]: UtdanningGodkjentValues
  [QuestionId.utdanningBestatt]: UtdanningBestattValues
  [QuestionId.andreForhold]: AndreForholdValues
  [QuestionId.tilbakeIArbeid]: TilbakeIArbeidValues
}

export type MerOppfolgingFormState = {
  [Key in keyof MerOppfolgingForm]: MerOppfolgingForm[Key] | null
}

export type MerOppfolgingValidForm = Partial<MerOppfolgingForm>
