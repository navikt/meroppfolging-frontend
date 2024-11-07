import { z } from 'zod'

import { FormSchema } from '@/pilot/server/services/schemas/formRequestSchema'

export const PilotStatusSchema = z.object({
  isPilot: z.literal(true),
  response: z.union([FormSchema, z.literal(null)]),
  hasAccessToSenOppfolging: z.boolean(),
})

export type StatusPilotDTO = z.infer<typeof PilotStatusSchema>
