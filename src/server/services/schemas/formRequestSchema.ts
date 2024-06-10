import { z } from 'zod'

const QuestionTypeSchema = z.enum(['FREMTIDIG_SITUASJON', 'BEHOV_FOR_OPPFOLGING'])

const FormRecordSchema = z.object({
  questionType: QuestionTypeSchema,
  questionText: z.string(),
  answerType: z.string(),
  answerText: z.string(),
})

export const FormRequestSchema = z.object({
  senOppfolgingFormV2: z.array(FormRecordSchema),
})

export type FormRequest = z.infer<typeof FormRequestSchema>
