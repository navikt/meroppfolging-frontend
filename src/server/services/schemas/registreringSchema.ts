import { z } from 'zod'

export const startRegisteringSchema = z.object({
  registreringType: z.string(),
})
export type StartRegisteringDTO = z.infer<typeof startRegisteringSchema>
