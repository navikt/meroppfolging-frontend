import { z } from 'zod'

export const sykmeldtSchema = z.boolean()
export type SykmeldtDTO = z.infer<typeof sykmeldtSchema>
