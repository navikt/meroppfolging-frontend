import { RegistrationTypes, ResponseStatus, StatusDTO } from '@/server/services/schemas/meroppfolgingSchema'

export const statusDTO: StatusDTO = {
  registrationType: RegistrationTypes.SYKMELDT_REGISTRERING,
  isSykmeldt: true,
  responseStatus: ResponseStatus.NO_RESPONSE,
}
