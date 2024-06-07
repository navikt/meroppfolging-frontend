import { z } from 'zod'

export const ResponseStatusPilotSchema = z.enum(['NO_RESPONSE', 'TRENGER_OPPFOLGING', 'TRENGER_IKKE_OPPFOLGING'])
export type ResponseStatusPilot = z.infer<typeof ResponseStatusPilotSchema>

export const StatusPilotDTOSchema = z.object({
  isPilot: z.boolean(),
  responseStatus: ResponseStatusPilotSchema,
})
export type StatusPilotDTO = z.infer<typeof StatusPilotDTOSchema>
