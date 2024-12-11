import { z } from 'zod'

import { FormSchema } from '@/server/services/schemas/formRequestSchema'

export const SenOppfolgingStatusSchema = z.object({
  response: z.union([FormSchema, z.literal(null)]),
  responseDateTime: z.string().optional(),
  hasAccessToSenOppfolging: z.boolean(),
})

export type SenOppfolgingStatusDTO = z.infer<typeof SenOppfolgingStatusSchema>
