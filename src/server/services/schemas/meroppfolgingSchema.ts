import { z } from 'zod'

import { QuestionId } from '@/types/merOppfolgingForm'
import {
  andreForholdAlt,
  AndreForholdValues,
  fremtidigSituasjonAlt,
  FremtidigSituasjonValues,
  tilbakeIArbeidAlt,
  TilbakeIArbeidValues,
  utdanningAlt,
  utdanningBestattAlt,
  UtdanningBestattValues,
  utdanningGodkjentAlt,
  UtdanningGodkjentValues,
  UtdanningValues,
} from '@/domain/radioValues'
import { formQuestionTexts } from '@/domain/formValues'

export enum RegistrationTypes {
  SYKMELDT_REGISTRERING = 'SYKMELDT_REGISTRERING',
  ORDINAER_REGISTRERING = 'ORDINAER_REGISTRERING',
  ALLEREDE_REGISTRERT = 'ALLEREDE_REGISTRERT',
}

export const statusSchema = z.object({
  registrationType: z.nativeEnum(RegistrationTypes).or(z.string()),
  isSykmeldt: z.boolean(),
})
export type StatusDTO = z.infer<typeof statusSchema>
export const INGEN_SVAR = 'INGEN_SVAR'
export const IKKE_BESVART = 'Ikke besvart'
const ingenSvarLiteral = z.literal(INGEN_SVAR)
const ikkeBesvartLiteral = z.literal(IKKE_BESVART)
const teksterForBesvarelseSchema = z.tuple([
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
    sporsmalId: z.literal('sisteStilling'),
    sporsmal: z.literal('Hva er din siste jobb?'),
    svar: z.literal('Ikke oppgitt'),
  }),
])
const teksterForBesvarelseWithTilbakeIArbeidSchema = z.tuple([
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
    sporsmalId: z.literal('sisteStilling'),
    sporsmal: z.literal('Hva er din siste jobb?'),
    svar: z.literal('Ikke oppgitt'),
  }),
  z.object({
    sporsmalId: z.literal(QuestionId.tilbakeIArbeid),
    sporsmal: z.literal(formQuestionTexts[QuestionId.tilbakeIArbeid]),
    svar: z.nativeEnum(tilbakeIArbeidAlt).or(ikkeBesvartLiteral),
  }),
])
export const completeRegistrationSchema = z.object({
  besvarelse: z.object({
    [QuestionId.utdanning]: z.nativeEnum(UtdanningValues).or(ingenSvarLiteral),
    [QuestionId.utdanningGodkjent]: z.nativeEnum(UtdanningGodkjentValues).or(ingenSvarLiteral),
    [QuestionId.utdanningBestatt]: z.nativeEnum(UtdanningBestattValues).or(ingenSvarLiteral),
    [QuestionId.andreForhold]: z.nativeEnum(AndreForholdValues).or(ingenSvarLiteral),
    [QuestionId.fremtidigSituasjon]: z.optional(z.nativeEnum(FremtidigSituasjonValues)),
    [QuestionId.tilbakeIArbeid]: z.optional(z.nativeEnum(TilbakeIArbeidValues)),
    sisteStilling: ingenSvarLiteral,
  }),
  teksterForBesvarelse: z.union([teksterForBesvarelseSchema, teksterForBesvarelseWithTilbakeIArbeidSchema]),
})
export type CompleteRegistrationRequest = z.infer<typeof completeRegistrationSchema>
