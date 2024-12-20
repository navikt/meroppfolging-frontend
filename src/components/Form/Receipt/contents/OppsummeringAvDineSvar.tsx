import { BodyShort, Box, Heading, Label } from '@navikt/ds-react'

import {
  BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS,
  BehovForOppfolgingAnswerTypes,
  FREMTIDIG_SITUASJON_ANSWER_TEXTS,
  FremtidigSituasjonAnswerTypes,
} from '@/domain/answerValues'
import { QUESTION_TEXTS } from '@/domain/formValues'

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
      <Label size="small">{QUESTION_TEXTS.FREMTIDIG_SITUASJON}</Label>
      <BodyShort size="small" spacing>
        {FREMTIDIG_SITUASJON_ANSWER_TEXTS[fremtidigSituasjonAnswer]}
      </BodyShort>

      <Label size="small">{QUESTION_TEXTS.BEHOV_FOR_OPPFOLGING}</Label>
      <BodyShort size="small">{BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS[behovForOppfolgingAnswer]}</BodyShort>
    </Box>
  </Box>
)

export default OppsummeringAvDineSvar
