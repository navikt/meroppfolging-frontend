import React, { ReactElement } from 'react'

import { Step } from '@/components/OtherForm/Step'
import RadioGroupForQuestion from '@/components/FormComponents/RadioGroupForQuestion'

interface Props {
  previousStep: () => void
  nextStep: () => void
}

export const FremtidigSituasjonStep = ({ previousStep, nextStep }: Props): ReactElement => {
  return (
    <Step heading="Fremtidig situasjon" previousStep={previousStep} nextStep={nextStep}>
      <RadioGroupForQuestion questionName="FREMTIDIG_SITUASJON" />
    </Step>
  )
}
