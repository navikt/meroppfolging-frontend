import { StartRegistrationDTO } from '@/server/services/schemas/registreringSchema'

export function createStartRegisterinDTO(overrides?: Partial<StartRegistrationDTO>): StartRegistrationDTO {
  return {
    registreringType: 'SYKMELDT_REGISTRERING',
    ...overrides,
  }
}
