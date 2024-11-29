export const FREMTIDIG_SITUASJON_ANSWER_TYPES = [
  'TILBAKE_HOS_ARBEIDSGIVER',
  'TILBAKE_GRADERT',
  'BYTTE_JOBB',
  'FORTSATT_SYK',
  'USIKKER',
] as const
export type FremtidigSituasjonAnswerTypes = (typeof FREMTIDIG_SITUASJON_ANSWER_TYPES)[number]
export const FREMTIDIG_SITUASJON_ANSWER_TEXTS = {
  TILBAKE_HOS_ARBEIDSGIVER: 'Jeg er frisk og tilbake hos arbeidsgiver',
  TILBAKE_GRADERT: 'Jeg er fortsatt syk, men jobber redusert',
  FORTSATT_SYK: 'Jeg er for syk til å jobbe',
  BYTTE_JOBB: 'Jeg skal bytte jobb',
  USIKKER: 'Jeg er usikker',
} as const satisfies Record<FremtidigSituasjonAnswerTypes, string>

export const BEHOV_FOR_OPPFOLGING_ANSWER_TYPES = ['JA', 'NEI'] as const
export type BehovForOppfolgingAnswerTypes = (typeof BEHOV_FOR_OPPFOLGING_ANSWER_TYPES)[number]
export const BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS = {
  JA: 'Ja, jeg vil bli kontaktet av en veileder',
  NEI: 'Nei, jeg trenger ikke å bli kontaktet nå',
} as const satisfies Record<BehovForOppfolgingAnswerTypes, string>
