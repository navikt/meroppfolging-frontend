import { MaxDateDTO } from '@/server/services/schemas/esyfoVarselSchema'

export function createMaxDateDTO(overrides?: Partial<MaxDateDTO>): MaxDateDTO {
  return {
    maxDate: '1. november 2023',
    utbetaltTom: '4. april 2023',
    ...overrides,
  }
}
