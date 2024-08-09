import { StatusPilotDTO } from '@/server/services/schemas/statusSchema'
import { ResponseStatus } from '@/server/services/schemas/meroppfolgingSchema'

export const pilotStatusDTO: StatusPilotDTO = {
  isPilot: true,
  response: null,
}

export const notPilotStatusDTO: StatusPilotDTO = {
  isPilot: false,
  responseStatus: ResponseStatus.NO_RESPONSE,
}
