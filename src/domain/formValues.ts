import { BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS, FREMTIDIG_SITUASJON_ANSWER_TEXTS } from '@/domain/answerValues'

export const QUESTION_TYPES = ['FREMTIDIG_SITUASJON', 'BEHOV_FOR_OPPFOLGING'] as const
export type QuestionTypes = (typeof QUESTION_TYPES)[number]

export const QUESTION_TEXTS = {
  FREMTIDIG_SITUASJON: 'Hvilken situasjon tror du at du er i når sykepengene har tatt slutt?',
  BEHOV_FOR_OPPFOLGING: 'Ønsker du å be om oppfølging?',
} as const satisfies Record<QuestionTypes, string>

export const ANSWER_TEXTS = {
  FREMTIDIG_SITUASJON: FREMTIDIG_SITUASJON_ANSWER_TEXTS,
  BEHOV_FOR_OPPFOLGING: BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS,
} as const satisfies Record<QuestionTypes, Record<string, string>>
