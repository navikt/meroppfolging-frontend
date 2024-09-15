import { ReactElement } from 'react'
import { Heading, Radio, RadioGroup } from '@navikt/ds-react'

import { ANSWER_TEXTS, QUESTION_TEXTS } from '@/pilot/domain/formValues'
import { FremtidigSituasjonAnswerTypes } from '@/pilot/domain/answerValues'

interface Props {
  onAnswerChange: (selectedAnswer: FremtidigSituasjonAnswerTypes) => void
}

function Steg1FremtidigSituasjonSporsmal({ onAnswerChange }: Props): ReactElement {
  const currentQuestionId = 'FREMTIDIG_SITUASJON'

  function handleChange(selectedAnswer: FremtidigSituasjonAnswerTypes): void {
    onAnswerChange(selectedAnswer)
  }

  return (
    <>
      <Heading size="small" level="2" spacing>
        {QUESTION_TEXTS[currentQuestionId]}
      </Heading>
      <RadioGroup legend="" onChange={handleChange}>
        {Object.entries(ANSWER_TEXTS[currentQuestionId]).map(([answerKey, answerText]) => (
          <Radio key={answerKey} value={answerKey}>
            {answerText}
          </Radio>
        ))}
      </RadioGroup>
    </>
  )
}

export default Steg1FremtidigSituasjonSporsmal
