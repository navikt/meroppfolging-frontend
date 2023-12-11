import { z } from 'zod'

export const maxDateSchema = z.object({
  maxDate: z.string().nullable(),
  utbetaltTom: z.string().nullable(),
})
export type MaxDateDTO = z.infer<typeof maxDateSchema>
