import { z } from 'zod'

import { FormSchema } from '@/pilot/server/services/schemas/formRequestSchema'

export const ResponseStatusPilotSchema = z.enum(['NO_RESPONSE', 'TRENGER_OPPFOLGING', 'TRENGER_IKKE_OPPFOLGING'])

export const ResponseFormSchema = z.union([FormSchema, z.literal(null)])

export const PilotStatusSchema = z.object({
  isPilot: z.literal(true),
  response: ResponseFormSchema,
})
export type PilotStatus = z.infer<typeof PilotStatusSchema>

export const NotPilotStatusSchema = z.object({
  isPilot: z.literal(false),
  responseStatus: ResponseStatusPilotSchema,
})
export type NotPilotStatus = z.infer<typeof NotPilotStatusSchema>

export const StatusPilotDTOSchema = z.union([PilotStatusSchema, NotPilotStatusSchema])
export type StatusPilotDTO = z.infer<typeof StatusPilotDTOSchema>
