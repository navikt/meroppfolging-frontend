import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'
import { ReactElement } from 'react'

import { ANSWER_TEXTS, QUESTION_TEXTS, QuestionTypes } from '@/pilot/domain/formValues'

function RadioAlternatives(name: QuestionTypes): React.ReactElement[] {
  const radioGroupAlts = ANSWER_TEXTS[name]

  const RadioAlternatives = Object.entries(radioGroupAlts).map(([key, value]) => {
    return (
      <Radio key={key} value={key}>
        {value}
      </Radio>
    )
  })

  return RadioAlternatives
}

function NestedRadioGroup({
  name,
  description,
  children,
}: {
  name: QuestionTypes
  description?: ReactElement
  children?: ReactElement
}): React.ReactElement {
  const { field, fieldState } = useController({
    name,
    rules: { required: 'Du må velge et alternativ' },
    defaultValue: null,
  })

  const legend = QUESTION_TEXTS[name]

  return (
    <RadioGroup {...field} legend={legend} description={description} error={fieldState.error?.message}>
      {RadioAlternatives(name)}
      {children}
    </RadioGroup>
  )
}

export default NestedRadioGroup
