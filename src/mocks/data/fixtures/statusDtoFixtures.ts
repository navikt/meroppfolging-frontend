import { StatusDTO } from '@/server/services/schemas/statusSchema'

export const IkkeSvart: StatusDTO = {
  response: null,
  hasAccessToSenOppfolging: true,
}

export const IkkeSvartAndShouldNotHaveAccess: StatusDTO = {
  response: null,
  hasAccessToSenOppfolging: false,
}

export const SvartFortsattSykOgTrengerOppfolging: StatusDTO = {
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

export const SvartTilbakeHosArbeidsgiverOgTrengerIkkeOppfolging: StatusDTO = {
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
