export enum SporsmalId {
  fremtidigSituasjon = 'fremtidigSituasjon',
  utdanning = 'utdanning',
  utdanningGodkjent = 'utdanningGodkjent',
  utdanningBestatt = 'utdanningBestatt',
  andreForhold = 'andreForhold',
  tilbakeIArbeid = 'tilbakeIArbeid',
}

export const sporsmalIdMap = {
  [SporsmalId.fremtidigSituasjon]: 'fremtidigSituasjon',
  [SporsmalId.utdanning]: 'utdanning',
  [SporsmalId.utdanningGodkjent]: 'utdanningGodkjent',
  [SporsmalId.utdanningBestatt]: 'utdanningBestatt',
  [SporsmalId.andreForhold]: 'andreForhold',
  [SporsmalId.tilbakeIArbeid]: 'tilbakeIArbeid',
} as const satisfies Record<SporsmalId, keyof typeof SporsmalId>

export type FormPage = SporsmalId | 'Oppsummering' | 'SkalTilbakeIArbeid'

export enum FremtidigSituasjonValues {
  SAMME_ARBEIDSGIVER = 'SAMME_ARBEIDSGIVER',
  SAMME_ARBEIDSGIVER_NY_STILLING = 'SAMME_ARBEIDSGIVER_NY_STILLING',
  NY_ARBEIDSGIVER = 'NY_ARBEIDSGIVER',
  USIKKER = 'USIKKER',
  INGEN_PASSER = 'INGEN_PASSER',
}

export enum UtdanningValues {
  INGEN_UTDANNING = 'INGEN_UTDANNING',
  GRUNNSKOLE = 'GRUNNSKOLE',
  VIDEREGAENDE_GRUNNUTDANNING = 'VIDEREGAENDE_GRUNNUTDANNING',
  VIDEREGAENDE_FAGBREV_SVENNEBREV = 'VIDEREGAENDE_FAGBREV_SVENNEBREV',
  HOYERE_UTDANNING_1_TIL_4 = 'HOYERE_UTDANNING_1_TIL_4',
  HOYERE_UTDANNING_5_ELLER_MER = 'HOYERE_UTDANNING_5_ELLER_MER',
}

export enum UtdanningGodkjentValues {
  JA = 'JA',
  NEI = 'NEI',
  VET_IKKE = 'VET_IKKE',
}

export enum UtdanningBestattValues {
  JA = 'JA',
  NEI = 'NEI',
}

export enum AndreForholdValues {
  JA = 'JA',
  NEI = 'NEI',
}

export enum TilbakeIArbeidValues {
  JA_FULL_STILLING = 'JA_FULL_STILLING',
  JA_REDUSERT_STILLING = 'JA_REDUSERT_STILLING',
  USIKKER = 'USIKKER',
  NEI = 'NEI',
}

export type MerOppfolgingForm = {
  [SporsmalId.fremtidigSituasjon]: FremtidigSituasjonValues
  [SporsmalId.utdanning]: UtdanningValues
  [SporsmalId.utdanningGodkjent]: UtdanningGodkjentValues
  [SporsmalId.utdanningBestatt]: UtdanningBestattValues
  [SporsmalId.andreForhold]: AndreForholdValues
  [SporsmalId.tilbakeIArbeid]: TilbakeIArbeidValues
}

export type MerOppfolgingFormState = {
  [Key in keyof MerOppfolgingForm]: MerOppfolgingForm[Key] | null
}
