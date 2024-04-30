import { formQuestionTexts } from '@/domain/formValues'
import {
  andreForholdAlt,
  fremtidigSituasjonAlt,
  merOppfolgingRadioAlt,
  tilbakeIArbeidAlt,
  utdanningAlt,
  utdanningBestattAlt,
  utdanningGodkjentAlt,
} from '@/domain/radioValues'
import { MerOppfolgingFormState, QuestionId } from '@/types/merOppfolgingForm'
import {
  CompleteRegistrationRequest,
  FormAnswerRequest,
  IKKE_BESVART,
  INGEN_SVAR,
  SenOppfolgingFormV1Request,
} from '@/server/services/schemas/meroppfolgingSchema'
import { isQuestionId, notNull } from '@/utils/tsUtils'
import {
  onskerOppfolgingAlt,
  OnskerOppfolgingOrigins,
  OnskerOppfolgingQuestionId,
  onskerOppfolgingQuestionTexts,
  OnskerOppfolgingValues,
} from '@/domain/OnskerOppfolging'

export function completeRegistrationRequestMapper(form: MerOppfolgingFormState): CompleteRegistrationRequest {
  const validBesvarelse: CompleteRegistrationRequest['besvarelse'] = {
    [QuestionId.utdanning]: form[QuestionId.utdanning] || INGEN_SVAR,
    [QuestionId.utdanningGodkjent]: form[QuestionId.utdanningGodkjent] || INGEN_SVAR,
    [QuestionId.utdanningBestatt]: form[QuestionId.utdanningBestatt] || INGEN_SVAR,
    [QuestionId.andreForhold]: form[QuestionId.andreForhold] || INGEN_SVAR,
    [QuestionId.fremtidigSituasjon]: form[QuestionId.fremtidigSituasjon] || undefined,
    [QuestionId.tilbakeIArbeid]: form[QuestionId.tilbakeIArbeid] || undefined,
    sisteStilling: INGEN_SVAR,
  }

  const validTeksterForBesvarelse = [
    {
      sporsmalId: QuestionId.utdanning,
      sporsmal: formQuestionTexts[QuestionId.utdanning],
      svar: form[QuestionId.utdanning] ? utdanningAlt[form[QuestionId.utdanning]] : IKKE_BESVART,
    },
    {
      sporsmalId: QuestionId.utdanningGodkjent,
      sporsmal: formQuestionTexts[QuestionId.utdanningGodkjent],
      svar: form[QuestionId.utdanningGodkjent]
        ? utdanningGodkjentAlt[form[QuestionId.utdanningGodkjent]]
        : IKKE_BESVART,
    },
    {
      sporsmalId: QuestionId.utdanningBestatt,
      sporsmal: formQuestionTexts[QuestionId.utdanningBestatt],
      svar: form[QuestionId.utdanningBestatt] ? utdanningBestattAlt[form[QuestionId.utdanningBestatt]] : IKKE_BESVART,
    },
    {
      sporsmalId: QuestionId.andreForhold,
      sporsmal: formQuestionTexts[QuestionId.andreForhold],
      svar: form[QuestionId.andreForhold] ? andreForholdAlt[form[QuestionId.andreForhold]] : IKKE_BESVART,
    },
    {
      sporsmalId: QuestionId.fremtidigSituasjon,
      sporsmal: formQuestionTexts[QuestionId.fremtidigSituasjon],
      svar: form[QuestionId.fremtidigSituasjon]
        ? fremtidigSituasjonAlt[form[QuestionId.fremtidigSituasjon]]
        : IKKE_BESVART,
    },
    {
      sporsmalId: 'sisteStilling',
      sporsmal: 'Hva er din siste jobb?',
      svar: 'Ikke oppgitt',
    },
  ] as const

  if (form[QuestionId.tilbakeIArbeid]) {
    return {
      besvarelse: validBesvarelse,
      teksterForBesvarelse: [
        ...validTeksterForBesvarelse,
        {
          sporsmalId: QuestionId.tilbakeIArbeid,
          sporsmal: formQuestionTexts[QuestionId.tilbakeIArbeid],
          svar: tilbakeIArbeidAlt[form[QuestionId.tilbakeIArbeid]],
        },
      ],
    }
  }

  return { besvarelse: validBesvarelse, teksterForBesvarelse: [...validTeksterForBesvarelse] }
}

type FormAnswer<T extends QuestionId, U extends keyof (typeof merOppfolgingRadioAlt)[T]> = {
  questionType: T
  questionText: (typeof formQuestionTexts)[T]
  answerType: U
  answerText: (typeof merOppfolgingRadioAlt)[T][U]
}

function createFormAnswer<T extends QuestionId, U extends keyof (typeof merOppfolgingRadioAlt)[T]>(
  questionId: T,
  answer: U | null,
): FormAnswer<T, U> | null {
  if (answer === null) return null
  return {
    questionType: questionId,
    questionText: formQuestionTexts[questionId],
    answerType: answer,
    answerText: merOppfolgingRadioAlt[questionId][answer],
  }
}

export function createOnskerOppfolgingAnswer(): FormAnswerRequest {
  return {
    questionType: OnskerOppfolgingQuestionId.onskerOppfolging,
    questionText: onskerOppfolgingQuestionTexts[OnskerOppfolgingOrigins.landing],
    answerType: OnskerOppfolgingValues.JA,
    answerText: onskerOppfolgingAlt[OnskerOppfolgingOrigins.landing][OnskerOppfolgingValues.JA],
  }
}

export function senOppfolgingFormV1Mapper(form: MerOppfolgingFormState): SenOppfolgingFormV1Request {
  const keysWithValue = Object.keys(form)
    .filter(isQuestionId)
    .filter((key) => !!form[key])

  const createdAnswers = keysWithValue.map((questionId) => {
    switch (questionId) {
      case QuestionId.utdanning:
        return createFormAnswer(questionId, form[QuestionId.utdanning])
      case QuestionId.utdanningGodkjent:
        return createFormAnswer(questionId, form[QuestionId.utdanningGodkjent])
      case QuestionId.utdanningBestatt:
        return createFormAnswer(questionId, form[QuestionId.utdanningBestatt])
      case QuestionId.andreForhold:
        return createFormAnswer(questionId, form[QuestionId.andreForhold])
      case QuestionId.fremtidigSituasjon:
        return createFormAnswer(questionId, form[QuestionId.fremtidigSituasjon])
      case QuestionId.tilbakeIArbeid:
        return createFormAnswer(questionId, form[QuestionId.tilbakeIArbeid])
      default:
        const exhaustiveCheck: never = questionId
        return exhaustiveCheck
    }
  })
  const validAnswers = createdAnswers.filter(notNull)

  return [createOnskerOppfolgingAnswer(), ...validAnswers]
}
