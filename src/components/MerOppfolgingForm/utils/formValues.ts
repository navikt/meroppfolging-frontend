import { invert } from 'remeda'

import {
  AndreForholdValues,
  FormPage,
  FremtidigSituasjonValues,
  MerOppfolgingFormState,
  SporsmalId,
  TilbakeIArbeidValues,
  UtdanningBestattValues,
  UtdanningGodkjentValues,
  UtdanningValues,
} from '@/types/merOppfolgingForm'

const fremtidigSituasjonAlt = {
  [FremtidigSituasjonValues.SAMME_ARBEIDSGIVER]: 'Jeg skal tilbake til jobben jeg har',
  [FremtidigSituasjonValues.SAMME_ARBEIDSGIVER_NY_STILLING]:
    'Jeg skal tilbake til arbeidsgiveren min, men i ny stilling',
  [FremtidigSituasjonValues.NY_ARBEIDSGIVER]: 'Jeg trenger ny jobb',
  [FremtidigSituasjonValues.USIKKER]: 'Jeg er usikker',
  [FremtidigSituasjonValues.INGEN_PASSER]: 'Ingen av disse alternativene passer',
} as const satisfies Record<FremtidigSituasjonValues, string>

const utdanningAlt = {
  [UtdanningValues.INGEN_UTDANNING]: 'Ingen utdanning',
  [UtdanningValues.GRUNNSKOLE]: 'Grunnskole',
  [UtdanningValues.VIDEREGAENDE_GRUNNUTDANNING]: 'Videregående grunnutdanning (1 til 2 år)',
  [UtdanningValues.VIDEREGAENDE_FAGBREV_SVENNEBREV]: 'Videregående, fagbrev eller svennebrev (3 år eller mer)',
  [UtdanningValues.HOYERE_UTDANNING_1_TIL_4]: 'Høyere utdanning (1 til 4 år)',
  [UtdanningValues.HOYERE_UTDANNING_5_ELLER_MER]: 'Høyere utdanning (5 år eller mer)',
} as const satisfies Record<UtdanningValues, string>

const utdanningGodkjentAlt = {
  [UtdanningGodkjentValues.JA]: 'Ja',
  [UtdanningGodkjentValues.NEI]: 'Nei',
  [UtdanningGodkjentValues.VET_IKKE]: 'Vet ikke',
} as const satisfies Record<UtdanningGodkjentValues, string>

const utdanningBestattAlt = {
  [UtdanningBestattValues.JA]: 'Ja',
  [UtdanningBestattValues.NEI]: 'Nei',
} as const satisfies Record<UtdanningBestattValues, string>

const andreForholdAlt = {
  [AndreForholdValues.JA]: 'Ja',
  [AndreForholdValues.NEI]: 'Nei',
} as const satisfies Record<AndreForholdValues, string>

const tilbakeIArbeidAlt = {
  [TilbakeIArbeidValues.JA_FULL_STILLING]: 'Ja, i full stilling',
  [TilbakeIArbeidValues.JA_REDUSERT_STILLING]: 'Ja, i redusert stilling',
  [TilbakeIArbeidValues.USIKKER]: 'Usikker',
  [TilbakeIArbeidValues.NEI]: 'Nei',
} as const satisfies Record<TilbakeIArbeidValues, string>

export const merOppfolgingRadioAlt = {
  [SporsmalId.fremtidigSituasjon]: fremtidigSituasjonAlt,
  [SporsmalId.utdanning]: utdanningAlt,
  [SporsmalId.utdanningGodkjent]: utdanningGodkjentAlt,
  [SporsmalId.utdanningBestatt]: utdanningBestattAlt,
  [SporsmalId.andreForhold]: andreForholdAlt,
  [SporsmalId.tilbakeIArbeid]: tilbakeIArbeidAlt,
} as const satisfies Record<SporsmalId, Record<string, string>>

export const merOppfolgingFormAlt = { ...merOppfolgingRadioAlt } as const

export const defaultFormValues: MerOppfolgingFormState = {
  [SporsmalId.fremtidigSituasjon]: null,
  [SporsmalId.utdanning]: null,
  [SporsmalId.utdanningGodkjent]: null,
  [SporsmalId.utdanningBestatt]: null,
  [SporsmalId.andreForhold]: null,
  [SporsmalId.tilbakeIArbeid]: null,
}

export const formPage = {
  ['0']: SporsmalId.fremtidigSituasjon,
  ['1']: SporsmalId.utdanning,
  ['2']: SporsmalId.utdanningGodkjent,
  ['3']: SporsmalId.utdanningBestatt,
  ['4']: SporsmalId.andreForhold,
  ['5']: SporsmalId.tilbakeIArbeid,
  ['6']: 'Oppsummering',
  ['7']: 'SkalTilbakeIArbeid',
} as const satisfies Record<string, FormPage>

export const formPageInverted = invert(formPage)

export const INITIAL_FORM_PAGE = SporsmalId.fremtidigSituasjon
