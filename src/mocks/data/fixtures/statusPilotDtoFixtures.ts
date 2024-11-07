import { StatusPilotDTO } from '@/server/services/schemas/statusSchema'

export const pilotIkkeSvart: StatusPilotDTO = {
  isPilot: true,
  response: null,
  hasAccessToSenOppfolging: true,
}

export const pilotIkkeSvartAndShouldNotHaveAccess: StatusPilotDTO = {
  isPilot: true,
  response: null,
  hasAccessToSenOppfolging: false,
}

export const pilotSvartFortsattSykOgTrengerOppfolging: StatusPilotDTO = {
  isPilot: true,
  hasAccessToSenOppfolging: true,
  response: [
    {
      questionType: 'FREMTIDIG_SITUASJON',
      questionText: 'Hva tenker du om fremtiden?',
      answerType: 'FORTSATT_SYK',
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

export const pilotSvartTilbakeHosArbeidsgiverOgTrengerIkkeOppfolging: StatusPilotDTO = {
  isPilot: true,
  hasAccessToSenOppfolging: true,
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
