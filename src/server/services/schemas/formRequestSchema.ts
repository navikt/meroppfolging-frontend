import { z } from 'zod'

import { BEHOV_FOR_OPPFOLGING_ANSWER_TYPES, FREMTIDIG_SITUASJON_ANSWER_TYPES } from '@/domain/answerValues'
import { QUESTION_TYPES } from '@/domain/formValues'

const QuestionTypeSchema = z.enum(QUESTION_TYPES)

export const FremtidigSituasjonFormSchema = z.object({
  questionType: z.literal(QuestionTypeSchema.enum.FREMTIDIG_SITUASJON),
  questionText: z.string(),
  answerType: z.enum(FREMTIDIG_SITUASJON_ANSWER_TYPES),
  answerText: z.string(),
})
export const BehovForOppfolgingFormSchema = z.object({
  questionType: z.literal(QuestionTypeSchema.enum.BEHOV_FOR_OPPFOLGING),
  questionText: z.string(),
  answerType: z.enum(BEHOV_FOR_OPPFOLGING_ANSWER_TYPES),
  answerText: z.string(),
})

export const FormSchema = z.tuple([FremtidigSituasjonFormSchema, BehovForOppfolgingFormSchema])
export type Form = z.infer<typeof FormSchema>

export const FormRequestSchema = z.object({
  senOppfolgingFormV2: FormSchema,
})
export type FormRequest = z.infer<typeof FormRequestSchema>
