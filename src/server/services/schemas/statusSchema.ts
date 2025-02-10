import { z } from 'zod'

import { FormSchema } from '@/server/services/schemas/formRequestSchema'

export const SenOppfolgingStatusSchema = z.object({
  response: FormSchema.nullable(),
  responseDateTime: z.string().nullable(),
  hasAccessToSenOppfolging: z.boolean(),
})

export type SenOppfolgingStatusDTO = z.infer<typeof SenOppfolgingStatusSchema>
