import { ResponseStatus } from '@/server/services/schemas/meroppfolgingSchema'
import { StatusPilotDTO } from '@/server/services/schemas/statusSchema'

export const pilotIkkeSvart: StatusPilotDTO = {
  isPilot: true,
  response: null,
}

// TODO: Brukes ikke, bruke eller slette?
export const pilotSvartTilbakeHosArbeidsgiver: StatusPilotDTO = {
  isPilot: true,
  response: [
    {
      questionType: 'FREMTIDIG_SITUASJON',
      questionText: 'Hva tenker du om fremtiden?',
      answerType: 'TILBAKE_HOS_ARBEIDSGIVER',
      answerText: 'syk',
    },
    {
      questionType: 'BEHOV_FOR_OPPFOLGING',
      questionText: 'Trenger du oppfølging fra Nav?',
      answerType: 'JA',
      answerText: 'ja',
    },
  ],
}

// TODO: Brukes ikke, bruke eller slette?
export const pilotTrengerIkkeOppfolging: StatusPilotDTO = {
  isPilot: true,
  response: [
    {
      questionType: 'FREMTIDIG_SITUASJON',
      questionText: 'Hva tenker du om fremtiden?',
      answerType: 'TILBAKE_HOS_ARBEIDSGIVER',
      answerText: 'Jeg er frisk og tilbake hos arbeidsgiver',
    },
    {
      questionType: 'BEHOV_FOR_OPPFOLGING',
      questionText: 'Trenger du oppfølging fra Nav?',
      answerType: 'NEI',
      answerText: 'nei',
    },
  ],
}

export const erIkkePilot: StatusPilotDTO = {
  isPilot: false,
  responseStatus: ResponseStatus.NO_RESPONSE,
}
