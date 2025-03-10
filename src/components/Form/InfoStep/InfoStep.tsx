'use client'

import { ReactElement, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'
import { Step } from '@/components/Step/Step'

import { FormInputs } from '../StepHandler'

import { TilbakeHosArbeidsgiver } from './Situasjoner/TilbakeHosArbeidsgiver'
import { TilbakeGradert } from './Situasjoner/TilbakeGradert'
import { BytteJobb } from './Situasjoner/BytteJobb'
import { FortsattSyk } from './Situasjoner/FortsattSyk'
import { Usikker } from './Situasjoner/Usikker'

interface Props {
  goToPreviousStep: () => void
}

interface SituationInfo {
  content: ReactElement
  heading: string
}

const getSituationInfo = (value: FremtidigSituasjonAnswerTypes): SituationInfo => {
  switch (value) {
    case 'TILBAKE_HOS_ARBEIDSGIVER':
      return { content: <TilbakeHosArbeidsgiver />, heading: 'Når du skal tilbake til arbeidsgiver' }
    case 'TILBAKE_GRADERT':
      return { content: <TilbakeGradert />, heading: 'Når du fortsatt er syk, men skal jobbe redusert' }
    case 'BYTTE_JOBB':
      return { content: <BytteJobb />, heading: 'Når du skal bytte jobb' }
    case 'FORTSATT_SYK':
      return { content: <FortsattSyk />, heading: 'Når du er for syk til å jobbe' }
    case 'USIKKER':
      return { content: <Usikker />, heading: 'Kan dette hjelpe?' }
    default:
      const _exhaustiveCheck: never = value
      return { content: <div>Unknown situation</div>, heading: 'Unknown situation' }
  }
}

export const InfoStep = ({ goToPreviousStep }: Props): ReactElement => {
  const { watch } = useFormContext<FormInputs>()
  const value: FremtidigSituasjonAnswerTypes = watch('FREMTIDIG_SITUASJON')
  const { content, heading } = getSituationInfo(value)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Step heading={heading} goToPreviousStep={goToPreviousStep}>
      {content}
    </Step>
  )
}
