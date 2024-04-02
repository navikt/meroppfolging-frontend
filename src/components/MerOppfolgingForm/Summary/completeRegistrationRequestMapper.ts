import { formQuestionTexts } from '@/domain/formValues'
import {
  andreForholdAlt,
  fremtidigSituasjonAlt,
  tilbakeIArbeidAlt,
  utdanningAlt,
  utdanningBestattAlt,
  utdanningGodkjentAlt,
} from '@/domain/radioValues'
import { MerOppfolgingFormState, QuestionId } from '@/types/merOppfolgingForm'
import { CompleteRegistrationRequest, IKKE_BESVART, INGEN_SVAR } from '@/server/services/schemas/meroppfolgingSchema'

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
