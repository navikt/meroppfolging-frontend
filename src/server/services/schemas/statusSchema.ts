import { z } from 'zod'

import { FormSchema } from '@/pilot/server/services/schemas/formRequestSchema'

import { ResponseStatus } from './meroppfolgingSchema'

export const PilotStatusSchema = z.object({
  isPilot: z.literal(true),
  response: z.union([FormSchema, z.literal(null)]),
})
export type PilotStatus = z.infer<typeof PilotStatusSchema>

export const NotPilotStatusSchema = z.object({
  isPilot: z.literal(false),
  responseStatus: z.nativeEnum(ResponseStatus),
})

export type StatusPilotDTO = z.infer<typeof PilotStatusSchema>
