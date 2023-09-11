import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { defaultFormValues } from '@/domain/formValues'
import { merOppfolgingRadioAlt } from '@/domain/radioValues'

function RadioAlternatives(name: keyof typeof merOppfolgingRadioAlt): React.ReactElement[] {
  const radioGroupAlts = merOppfolgingRadioAlt[name]

  return Object.entries(radioGroupAlts).map(([key, value]) => {
    return (
      <Radio key={key} value={key}>
        {value}
      </Radio>
    )
  })
}

function NestedRadioGroup({
  name,
  legend,
  description,
}: {
  name: keyof typeof merOppfolgingRadioAlt
  legend: string
  description?: string
}): React.ReactElement {
  const { field, fieldState } = useController({
    name,
    rules: { required: 'Du må svare på spørsmålet' },
    defaultValue: defaultFormValues[name],
  })

  return (
    <RadioGroup {...field} legend={legend} description={description} error={fieldState.error?.message}>
      {RadioAlternatives(name)}
    </RadioGroup>
  )
}

export default NestedRadioGroup
