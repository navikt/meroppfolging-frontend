import { z } from 'zod'

const SenOppfolgingQuestionTypeV2Schema = z.enum(['FREMTIDIG_SITUASJON', 'ONSKER_OPPFOLGING'])
const FremtidigSituasjonSvarSchema = z.enum([
  'TILBAKE_HOS_ARBEIDSGIVER',
  'TILBAKE_MED_TILPASNINGER',
  'FORTSATT_SYK',
  'USIKKER',
])
const OnskerOppfolgingSvarSchema = z.enum(['JA', 'NEI'])

const SenOppfolgingQuestionV2Schema = z.object({
  questionType: SenOppfolgingQuestionTypeV2Schema,
  questionText: z.string(),
  answerType: z.string(),
  answerText: z.string(),
})

const SenOppfolgingDTOV2Schema = z.object({
  senOppfolgingFormV2: z.array(SenOppfolgingQuestionV2Schema),
})

export type SenOppfolgingQuestionTypeV2 = z.infer<typeof SenOppfolgingQuestionTypeV2Schema>
export type FremtidigSituasjonSvar = z.infer<typeof FremtidigSituasjonSvarSchema>
export type OnskerOppfolgingSvar = z.infer<typeof OnskerOppfolgingSvarSchema>
export type SenOppfolgingQuestionV2 = z.infer<typeof SenOppfolgingQuestionV2Schema>
export type SenOppfolgingDTOV2 = z.infer<typeof SenOppfolgingDTOV2Schema>
