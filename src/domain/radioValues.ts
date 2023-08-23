import { QuestionId } from '@/types/merOppfolgingForm'

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

export const fremtidigSituasjonAlt = {
  [FremtidigSituasjonValues.SAMME_ARBEIDSGIVER]: 'Jeg skal tilbake til jobben jeg har',
  [FremtidigSituasjonValues.SAMME_ARBEIDSGIVER_NY_STILLING]:
    'Jeg skal tilbake til arbeidsgiveren min, men i ny stilling',
  [FremtidigSituasjonValues.NY_ARBEIDSGIVER]: 'Jeg trenger ny jobb',
  [FremtidigSituasjonValues.USIKKER]: 'Jeg er usikker',
  [FremtidigSituasjonValues.INGEN_PASSER]: 'Ingen av disse alternativene passer',
} as const satisfies Record<FremtidigSituasjonValues, string>

export const utdanningAlt = {
  [UtdanningValues.INGEN_UTDANNING]: 'Ingen utdanning',
  [UtdanningValues.GRUNNSKOLE]: 'Grunnskole',
  [UtdanningValues.VIDEREGAENDE_GRUNNUTDANNING]: 'Videregående grunnutdanning (1 til 2 år)',
  [UtdanningValues.VIDEREGAENDE_FAGBREV_SVENNEBREV]: 'Videregående, fagbrev eller svennebrev (3 år eller mer)',
  [UtdanningValues.HOYERE_UTDANNING_1_TIL_4]: 'Høyere utdanning (1 til 4 år)',
  [UtdanningValues.HOYERE_UTDANNING_5_ELLER_MER]: 'Høyere utdanning (5 år eller mer)',
} as const satisfies Record<UtdanningValues, string>

export const utdanningGodkjentAlt = {
  [UtdanningGodkjentValues.JA]: 'Ja',
  [UtdanningGodkjentValues.NEI]: 'Nei',
  [UtdanningGodkjentValues.VET_IKKE]: 'Vet ikke',
} as const satisfies Record<UtdanningGodkjentValues, string>

export const utdanningBestattAlt = {
  [UtdanningBestattValues.JA]: 'Ja',
  [UtdanningBestattValues.NEI]: 'Nei',
} as const satisfies Record<UtdanningBestattValues, string>

export const andreForholdAlt = {
  [AndreForholdValues.JA]: 'Ja',
  [AndreForholdValues.NEI]: 'Nei',
} as const satisfies Record<AndreForholdValues, string>

export const tilbakeIArbeidAlt = {
  [TilbakeIArbeidValues.JA_FULL_STILLING]: 'Ja, i full stilling',
  [TilbakeIArbeidValues.JA_REDUSERT_STILLING]: 'Ja, i redusert stilling',
  [TilbakeIArbeidValues.USIKKER]: 'Usikker',
  [TilbakeIArbeidValues.NEI]: 'Nei',
} as const satisfies Record<TilbakeIArbeidValues, string>

export const merOppfolgingRadioAlt = {
  [QuestionId.fremtidigSituasjon]: fremtidigSituasjonAlt,
  [QuestionId.utdanning]: utdanningAlt,
  [QuestionId.utdanningGodkjent]: utdanningGodkjentAlt,
  [QuestionId.utdanningBestatt]: utdanningBestattAlt,
  [QuestionId.andreForhold]: andreForholdAlt,
  [QuestionId.tilbakeIArbeid]: tilbakeIArbeidAlt,
} as const
