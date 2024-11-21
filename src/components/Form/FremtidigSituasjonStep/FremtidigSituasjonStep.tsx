import React, { ReactElement, useEffect } from 'react'

import RadioGroupForQuestion from '@/components/FormComponents/RadioGroupForQuestion'

import { Step } from '../Step'

interface Props {
  previousStep: () => void
  nextStep: () => void
}

export const FremtidigSituasjonStep = ({ previousStep, nextStep }: Props): ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Step heading="Fremtidig situasjon" previousStep={previousStep} nextStep={nextStep}>
      <RadioGroupForQuestion questionName="FREMTIDIG_SITUASJON" />
    </Step>
  )
}
