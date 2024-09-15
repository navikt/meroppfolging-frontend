import { ReactElement } from 'react'
import { Heading, Radio, RadioGroup } from '@navikt/ds-react'

import { QUESTION_TEXTS } from '@/pilot/domain/formValues'
import { BehovForOppfolgingAnswerTypes } from '@/pilot/domain/answerValues'

interface Props {
  onAnswerChange: (selectedAnswer: BehovForOppfolgingAnswerTypes) => void
}

const BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS = {
  JA: 'Ja, jeg ønsker å bli kontaktet',
  ALLEREDE_AVTALT: 'Jeg har allerede en avtale med min veileder',
  NEI: 'Nei, jeg har ikke behov for å bli kontaktet',
} as const

function Steg3SnakkeMedVeilederSporsmal({ onAnswerChange }: Props): ReactElement {
  const currentQuestionId = 'BEHOV_FOR_OPPFOLGING'

  function handleChange(selectedAnswer: BehovForOppfolgingAnswerTypes): void {
    onAnswerChange(selectedAnswer)
  }

  return (
    <>
      <Heading size="small" level="2" spacing>
        {QUESTION_TEXTS[currentQuestionId]}
      </Heading>
      <RadioGroup legend="" onChange={handleChange}>
        {Object.entries(BEHOV_FOR_OPPFOLGING_ANSWER_TEXTS).map(([answerKey, answerText]) => (
          <Radio key={answerKey} value={answerKey}>
            {answerText}
          </Radio>
        ))}
      </RadioGroup>
    </>
  )
}

export default Steg3SnakkeMedVeilederSporsmal
