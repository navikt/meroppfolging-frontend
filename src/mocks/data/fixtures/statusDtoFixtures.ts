import { SenOppfolgingStatusDTO } from '@/server/services/schemas/statusSchema'

const responseDateTime = new Date().toISOString()

export const IkkeSvart: SenOppfolgingStatusDTO = {
  response: null,
  hasAccessToSenOppfolging: true,
}

export const IkkeSvartAndShouldNotHaveAccess: SenOppfolgingStatusDTO = {
  response: null,
  hasAccessToSenOppfolging: false,
}

export const SvartFortsattSykOgTrengerOppfolging: SenOppfolgingStatusDTO = {
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
  responseDateTime,
}

export const SvartTilbakeHosArbeidsgiverOgTrengerIkkeOppfolging: SenOppfolgingStatusDTO = {
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
  responseDateTime,
}
