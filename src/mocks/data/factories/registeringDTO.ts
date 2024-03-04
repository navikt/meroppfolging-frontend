import { StartRegistrationDTO } from '@/server/services/schemas/registreringSchema'

export function createStartRegisterinDTO(overrides?: Partial<StartRegistrationDTO>): StartRegistrationDTO {
  return {
    registreringType: 'SYKMELDT_REGISTRERING',
    formidlingsgruppe: 'IARBS',
    rettighetsgruppe: 'IYT',
    servicegruppe: 'VURDI',
    ...overrides,
  }
}
