import { SenOppfolgingFormRequest } from '@/server/services/schemas/meroppfolgingSchema'
import { MerOppfolgingFormState } from '@/types/merOppfolgingForm'
import {
  completeRegistrationRequestMapper,
  createOnskerOppfolgingAnswer,
} from '@/components/MerOppfolgingForm/Summary/completeRegistrationRequestMapper'
import {
  onskerOppfolgingAlt,
  OnskerOppfolgingOrigins,
  OnskerOppfolgingQuestionId,
  onskerOppfolgingQuestionTexts,
  OnskerOppfolgingValues,
} from '@/domain/OnskerOppfolging'

export function createOnskerIkkeSenOppfolgingFormRequest(origin: OnskerOppfolgingOrigins): SenOppfolgingFormRequest {
  return {
    senOppfolgingFormV1: [
      {
        questionType: OnskerOppfolgingQuestionId.onskerOppfolging,
        questionText: onskerOppfolgingQuestionTexts[origin],
        answerType: OnskerOppfolgingValues.NEI,
        answerText: onskerOppfolgingAlt[origin][OnskerOppfolgingValues.NEI],
      },
    ],
  }
}

export function createSenOppfolgingFormRequest(form: MerOppfolgingFormState): SenOppfolgingFormRequest {
  return {
    senOppfolgingRegistrering: completeRegistrationRequestMapper(form),
    senOppfolgingFormV1: [createOnskerOppfolgingAnswer()],
  }
}
