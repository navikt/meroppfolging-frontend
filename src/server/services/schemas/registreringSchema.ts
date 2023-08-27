import { z } from 'zod'

import {
  AndreForholdValues,
  FremtidigSituasjonValues,
  TilbakeIArbeidValues,
  UtdanningBestattValues,
  UtdanningGodkjentValues,
  UtdanningValues,
  andreForholdAlt,
  fremtidigSituasjonAlt,
  tilbakeIArbeidAlt,
  utdanningAlt,
  utdanningBestattAlt,
  utdanningGodkjentAlt,
} from '@/domain/radioValues'
import { QuestionId } from '@/types/merOppfolgingForm'
import { formQuestionTexts } from '@/domain/formValues'

export const startRegistrationSchema = z.object({
  registreringType: z.string(),
})
export type StartRegistrationDTO = z.infer<typeof startRegistrationSchema>

export const INGEN_SVAR = 'INGEN_SVAR'
export const IKKE_BESVART = 'Ikke besvart'

const ingenSvarLiteral = z.literal(INGEN_SVAR)
const ikkeBesvartLiteral = z.literal(IKKE_BESVART)

export const completeRegistrationSchema = z.object({
  besvarelse: z.object({
    [QuestionId.utdanning]: z.nativeEnum(UtdanningValues).or(ingenSvarLiteral),
    [QuestionId.utdanningGodkjent]: z.nativeEnum(UtdanningGodkjentValues).or(ingenSvarLiteral),
    [QuestionId.utdanningBestatt]: z.nativeEnum(UtdanningBestattValues).or(ingenSvarLiteral),
    [QuestionId.andreForhold]: z.nativeEnum(AndreForholdValues).or(ingenSvarLiteral),
    [QuestionId.fremtidigSituasjon]: z.nativeEnum(FremtidigSituasjonValues).or(ingenSvarLiteral),
    [QuestionId.tilbakeIArbeid]: z.nativeEnum(TilbakeIArbeidValues).or(ingenSvarLiteral),
    sisteStilling: ingenSvarLiteral,
  }),
  teksterForBesvarelse: z.tuple([
    z.object({
      sporsmalId: z.literal(QuestionId.utdanning),
      sporsmal: z.literal(formQuestionTexts[QuestionId.utdanning]),
      svar: z.nativeEnum(utdanningAlt).or(ikkeBesvartLiteral),
    }),
    z.object({
      sporsmalId: z.literal(QuestionId.utdanningGodkjent),
      sporsmal: z.literal(formQuestionTexts[QuestionId.utdanningGodkjent]),
      svar: z.nativeEnum(utdanningGodkjentAlt).or(ikkeBesvartLiteral),
    }),
    z.object({
      sporsmalId: z.literal(QuestionId.utdanningBestatt),
      sporsmal: z.literal(formQuestionTexts[QuestionId.utdanningBestatt]),
      svar: z.nativeEnum(utdanningBestattAlt).or(ikkeBesvartLiteral),
    }),
    z.object({
      sporsmalId: z.literal(QuestionId.andreForhold),
      sporsmal: z.literal(formQuestionTexts[QuestionId.andreForhold]),
      svar: z.nativeEnum(andreForholdAlt).or(ikkeBesvartLiteral),
    }),
    z.object({
      sporsmalId: z.literal(QuestionId.fremtidigSituasjon),
      sporsmal: z.literal(formQuestionTexts[QuestionId.fremtidigSituasjon]),
      svar: z.nativeEnum(fremtidigSituasjonAlt).or(ikkeBesvartLiteral),
    }),
    z.object({
      sporsmalId: z.literal(QuestionId.tilbakeIArbeid),
      sporsmal: z.literal(formQuestionTexts[QuestionId.tilbakeIArbeid]),
      svar: z.nativeEnum(tilbakeIArbeidAlt).or(ikkeBesvartLiteral),
    }),
    z.object({
      sporsmalId: z.literal('sisteStilling'),
      sporsmal: z.literal('Hva er din siste jobb?'),
      svar: z.literal('Ikke oppgitt'),
    }),
  ]),
})
export type CompleteRegistrationRequest = z.infer<typeof completeRegistrationSchema>