import { RegistrationTypes, ResponseStatus, StatusDTO } from '@/server/services/schemas/meroppfolgingSchema'

export const statusDtoIkkeSvart: StatusDTO = {
  registrationType: RegistrationTypes.SYKMELDT_REGISTRERING,
  isSykmeldt: true,
  responseStatus: ResponseStatus.NO_RESPONSE,
}

export const statusDtoTrengerOppfolging: StatusDTO = {
  registrationType: RegistrationTypes.SYKMELDT_REGISTRERING,
  isSykmeldt: true,
  responseStatus: ResponseStatus.TRENGER_OPPFOLGING,
}

export const statusDtoTrengerIkkeOppfolging: StatusDTO = {
  registrationType: RegistrationTypes.SYKMELDT_REGISTRERING,
  isSykmeldt: true,
  responseStatus: ResponseStatus.TRENGER_IKKE_OPPFOLGING,
}
