import { StatusPilotDTO } from '@/server/services/schemas/statusSchema'
import { ResponseStatus } from '@/server/services/schemas/meroppfolgingSchema'

export const pilotStatusDTO: StatusPilotDTO = {
  isPilot: true,
  response: [
    {
      questionType: 'FREMTIDIG_SITUASJON',
      questionText: 'Hvordan ser din fremtidige situasjon ut?',
      answerType: 'TILBAKE_HOS_ARBEIDSGIVER',
      answerText: 'Jeg er frisk og tilbake hos arbeidsgiver',
    },
    {
      questionType: 'BEHOV_FOR_OPPFOLGING',
      questionText: 'Har du behov for oppfølging?',
      answerType: 'JA',
      answerText: 'Ja, jeg vil bli kontaktet',
    },
  ],
}

export const notPilotStatusDTO: StatusPilotDTO = {
  isPilot: false,
  responseStatus: ResponseStatus.NO_RESPONSE,
}
