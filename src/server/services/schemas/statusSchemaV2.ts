import { z } from 'zod'

export const ResponseStatusSchema = z.enum(['NO_RESPONSE', 'TRENGER_OPPFOLGING', 'TRENGER_IKKE_OPPFOLGING'])

export const SenOppfolgingStatusDTOV2Schema = z.object({
  isPilot: z.boolean(),
  responseStatus: ResponseStatusSchema,
})

export type ResponseStatusV2 = z.infer<typeof ResponseStatusSchema>
export type SenOppfolgingStatusDTOV2 = z.infer<typeof SenOppfolgingStatusDTOV2Schema>
