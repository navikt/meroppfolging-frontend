import { Radio, RadioGroup } from '@navikt/ds-react'
import { useController } from 'react-hook-form'

import { defaultFormValues, merOppfolgingRadioAlt } from '../utils/formValues'

import { MerOppfolgingFormState } from '@/types/merOppfolgingForm'

function GetRadioAlternatives<T extends keyof typeof merOppfolgingRadioAlt>(name: T): React.ReactElement[] {
  const radioGroupAlts = merOppfolgingRadioAlt[name]

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
  legend,
  description,
}: {
  name: keyof MerOppfolgingFormState
  legend: string
  description?: string
}): React.ReactElement {
  const { field, fieldState } = useController({
    name,
    rules: { required: 'Du må svare på spørsmålet' },
    defaultValue: defaultFormValues[name],
  })

  return (
    <>
      <RadioGroup {...field} legend={legend} description={description} error={fieldState.error?.message}>
        {GetRadioAlternatives(name)}
      </RadioGroup>
    </>
  )
}

export default NestedRadioGroup
