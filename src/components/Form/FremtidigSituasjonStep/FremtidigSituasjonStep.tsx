import React, { ReactElement, useEffect } from 'react'

import RadioGroupForQuestion from '@/components/FormComponents/RadioGroupForQuestion'

import { Step } from '../Step'

interface Props {
  goToPreviousStep: () => void
}

export const FremtidigSituasjonStep = ({ goToPreviousStep }: Props): ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Step heading="Fremtidig situasjon" goToPreviousStep={goToPreviousStep}>
      <RadioGroupForQuestion questionName="FREMTIDIG_SITUASJON" />
    </Step>
  )
}
