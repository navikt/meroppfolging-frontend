import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'
import { ReactElement } from 'react'

import { ANSWER_TEXTS, QUESTION_TEXTS, QuestionTypes } from '@/domain/formValues'
import { logCustomAmplitudeEvent } from '@/libs/amplitude/amplitude'

function RadioGroupForQuestion({
  questionName,
  description,
  children,
}: {
  questionName: QuestionTypes
  description?: ReactElement
  children?: ReactElement
}): React.ReactElement {
  const { field, fieldState } = useController({
    name: questionName,
    rules: { required: 'Du må velge et alternativ' },
    defaultValue: null,
  })

  const questionText = QUESTION_TEXTS[questionName]
  const answerAlternativesValuesToLabels = ANSWER_TEXTS[questionName]

  const radioButtons = Object.entries(answerAlternativesValuesToLabels).map(([value, label]) => (
    <Radio
      key={value}
      value={value}
      onClick={() => {
        logCustomAmplitudeEvent('RadioButton clicked', { questionText: { questionText }, radioName: { value } })
      }}
    >
      {label}
    </Radio>
  ))

  return (
    <RadioGroup {...field} legend={questionText} description={description} error={fieldState.error?.message}>
      {radioButtons}

      {children}
    </RadioGroup>
  )
}

export default RadioGroupForQuestion
