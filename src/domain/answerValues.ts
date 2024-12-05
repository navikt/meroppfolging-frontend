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
  USIKKER: 'Ingen av alternativene passer',
} as const satisfies Record<FremtidigSituasjonAnswerTypes, string>

export const BEHOV_FOR_OPPFOLGING_ANSWER_TYPES = ['JA', 'NEI'] as const
export type BehovForOppfolgingAnswerTypes = (typeof BEHOV_FOR_OPPFOLGING_ANSWER_TYPES)[number]
export const BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS = {
  JA: 'Ja, jeg ønsker å be om oppfølging',
  NEI: 'Nei, jeg trenger ikke oppfølging nå',
} as const satisfies Record<BehovForOppfolgingAnswerTypes, string>
