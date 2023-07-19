import { StartRegisteringDTO } from '@/server/services/schemas/registreringSchema'

export function createStartRegisterinDTO(overrides?: Partial<StartRegisteringDTO>): StartRegisteringDTO {
  return {
    registreringType: 'SYKMELDT_REGISTRERING',
    ...overrides,
  }
}
