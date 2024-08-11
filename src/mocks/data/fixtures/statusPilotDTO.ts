import { StatusPilotDTO } from '@/server/services/schemas/statusSchema'
import { ResponseStatus } from '@/server/services/schemas/meroppfolgingSchema'

export const pilotStatusDTO: StatusPilotDTO = {
  isPilot: true,
  response: null,
}

export const pilotStatusWithResponseDTO: StatusPilotDTO = {
  isPilot: true,
  response: [
    {
      questionType: 'FREMTIDIG_SITUASJON',
      questionText: 'Hva tenker du om fremtiden?',
      answerType: 'FORTSATT_SYK',
      answerText: 'syk',
    },
    {
      questionType: 'BEHOV_FOR_OPPFOLGING',
      questionText: 'Trenger du oppfølging fra NAV?',
      answerType: 'JA',
      answerText: 'ja',
    },
  ],
}

export const notPilotStatusDTO: StatusPilotDTO = {
  isPilot: false,
  responseStatus: ResponseStatus.TRENGER_OPPFOLGING,
}
