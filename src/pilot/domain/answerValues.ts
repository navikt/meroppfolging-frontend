export const FREMTIDIG_SITUASJON_ANSWER_TYPES = [
  'TILBAKE_HOS_ARBEIDSGIVER',
  'TILBAKE_MED_TILPASNINGER',
  'TILBAKE_GRADERT',
  'BYTTE_JOBB',
  'FORTSATT_SYK',
  'USIKKER',
] as const
export type FremtidigSituasjonAnswerTypes = (typeof FREMTIDIG_SITUASJON_ANSWER_TYPES)[number]
export const FREMTIDIG_SITUASJON_ANSWER_TEXTS = {
  TILBAKE_HOS_ARBEIDSGIVER: 'Jeg er frisk og tilbake hos arbeidsgiver',
  TILBAKE_MED_TILPASNINGER: 'Jeg er tilbake i full jobb, men trenger tilpasninger på arbeidsplassen',
  TILBAKE_GRADERT: 'Jeg er tilbake i jobb, men skal jobbe gradert',
  BYTTE_JOBB: 'Jeg skal bytte jobb',
  FORTSATT_SYK: 'Jeg er for syk til å jobbe',
  USIKKER: 'Jeg er usikker',
} as const satisfies Record<FremtidigSituasjonAnswerTypes, string>

export const BEHOV_FOR_OPPFOLGING_ANSWER_TYPES = ['JA', 'NEI'] as const
export type BehovForOppfolgingAnswerTypes = (typeof BEHOV_FOR_OPPFOLGING_ANSWER_TYPES)[number]
export const BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS = {
  JA: 'Ja, jeg vil snakke med en veileder i NAV',
  NEI: 'Nei takk, jeg klarer meg på egenhånd',
} as const satisfies Record<BehovForOppfolgingAnswerTypes, string>
