import { MaxDateDTO } from '@/server/schemas/sykepengedagerInformasjonSchema'

export function createMaxDateDTO(overrides?: Partial<MaxDateDTO>): MaxDateDTO {
  return {
    maxDate: '1. november 2023',
    utbetaltTom: '4. april 2023',
    gjenstaendeSykedager: '70',
    ...overrides,
  }
}
