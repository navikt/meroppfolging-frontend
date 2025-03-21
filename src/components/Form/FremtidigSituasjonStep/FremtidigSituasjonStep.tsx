'use client'

import React, { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import RadioGroupForQuestion from '@/components/FormComponents/RadioGroupForQuestion'
import { Step } from '@/components/Step/Step'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'

export const FremtidigSituasjonStep = (): ReactElement => {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const goToLanding = (): void => {
    logAmplitudeEvent({
      eventName: 'navigere',
      data: {
        lenketekst: 'Forrige',
        destinasjon: 'Landing',
      },
    })
    router.push('/snart-slutt-pa-sykepengene')
  }

  return (
    <Step heading="Din forventning til fremtidig situasjon" goToPreviousStep={goToLanding}>
      <RadioGroupForQuestion questionName="FREMTIDIG_SITUASJON" />
    </Step>
  )
}
