import { z } from 'zod'

import { FormSchema } from '@/server/services/schemas/formRequestSchema'

export const StatusSchema = z.object({
  response: z.union([FormSchema, z.literal(null)]),
  hasAccessToSenOppfolging: z.boolean(),
})

export type StatusDTO = z.infer<typeof StatusSchema>
