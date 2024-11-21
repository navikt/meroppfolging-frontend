import { FormInputs } from '@/components/Form/LandingContent'
import { ANSWER_TEXTS, QUESTION_TEXTS, QuestionTypes } from '@/domain/formValues'
import { FormRequest } from '@/server/services/schemas/formRequestSchema'

type FormRecord<T extends QuestionTypes, U extends keyof (typeof ANSWER_TEXTS)[T]> = {
  questionType: T
  questionText: (typeof QUESTION_TEXTS)[T]
  answerType: U
  answerText: (typeof ANSWER_TEXTS)[T][U]
}

function createFormRecord<T extends QuestionTypes, U extends keyof (typeof ANSWER_TEXTS)[T]>(
  questionType: T,
  answerType: U,
): FormRecord<T, U> {
  return {
    questionType: questionType,
    questionText: QUESTION_TEXTS[questionType],
    answerType: answerType,
    answerText: ANSWER_TEXTS[questionType][answerType],
  }
}

export function createFormRequest(form: FormInputs): FormRequest {
  return {
    senOppfolgingFormV2: [
      createFormRecord('FREMTIDIG_SITUASJON', form['FREMTIDIG_SITUASJON']),
      createFormRecord('BEHOV_FOR_OPPFOLGING', form['BEHOV_FOR_OPPFOLGING']),
    ],
  }
}
