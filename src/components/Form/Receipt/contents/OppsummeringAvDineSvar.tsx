import { BodyShort, Box, Heading, Label } from '@navikt/ds-react'

import {
  BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS,
  BehovForOppfolgingAnswerTypes,
  FREMTIDIG_SITUASJON_ANSWER_TEXTS,
  FremtidigSituasjonAnswerTypes,
} from '@/domain/answerValues'

interface Props {
  fremtidigSituasjonAnswer: FremtidigSituasjonAnswerTypes
  behovForOppfolgingAnswer: BehovForOppfolgingAnswerTypes
}

const OppsummeringAvDineSvar = ({ fremtidigSituasjonAnswer, behovForOppfolgingAnswer }: Props): React.ReactNode => (
  <Box>
    <Heading size="medium" spacing>
      Oppsummering av dine svar
    </Heading>

    <Box padding="4" background="surface-info-subtle" borderRadius="medium">
      <Label size="small">Hvilken situasjon tror du at du er i når sykepengene har tatt slutt?</Label>
      <BodyShort size="small" spacing>
        {FREMTIDIG_SITUASJON_ANSWER_TEXTS[fremtidigSituasjonAnswer]}
      </BodyShort>

      <Label size="small">Ønsker du å be om oppfølging?</Label>
      <BodyShort size="small">{BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS[behovForOppfolgingAnswer]}</BodyShort>
    </Box>
  </Box>
)

export default OppsummeringAvDineSvar
