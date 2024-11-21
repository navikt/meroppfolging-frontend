import { ReactElement, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'

import { Step } from '../Step'
import { FormInputs } from '../LandingContent'

import { TilbakeHosArbeidsgiver } from './Situasjoner/TilbakeHosArbeidsgiver'
import { TilbakeMedTilpasninger } from './Situasjoner/TilbakeMedTilpasninger'
import { TilbakeGradert } from './Situasjoner/TilbakeGradert'
import { BytteJobb } from './Situasjoner/BytteJobb'
import { FortsattSyk } from './Situasjoner/FortsattSyk'
import { Usikker } from './Situasjoner/Usikker'

interface Props {
  previousStep: () => void
  nextStep: () => void
}

interface SituationInfo {
  content: ReactElement
  heading: string
}

const getSituationInfo = (value: FremtidigSituasjonAnswerTypes): SituationInfo => {
  switch (value) {
    case 'TILBAKE_HOS_ARBEIDSGIVER':
      return { content: <TilbakeHosArbeidsgiver />, heading: 'Når du skal tilbake til arbeidsgiver' }
    case 'TILBAKE_MED_TILPASNINGER':
      return { content: <TilbakeMedTilpasninger />, heading: 'Når du trenger tilrettelegging på arbeidsplassen' }
    case 'TILBAKE_GRADERT':
      return { content: <TilbakeGradert />, heading: 'Når du skal jobbe i redusert stillingsprosent' }
    case 'BYTTE_JOBB':
      return { content: <BytteJobb />, heading: 'Når du skal bytte jobb' }
    case 'FORTSATT_SYK':
      return { content: <FortsattSyk />, heading: 'Når du er for syk til å jobbe' }
    case 'USIKKER':
      return { content: <Usikker />, heading: 'Når du er for syk til å jobbe' }
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _exhaustiveCheck: never = value
      return { content: <div>Unknown situation</div>, heading: 'Unknown situation' }
  }
}

export const InfoStep = ({ previousStep, nextStep }: Props): ReactElement => {
  const { watch } = useFormContext<FormInputs>()
  const value: FremtidigSituasjonAnswerTypes = watch('FREMTIDIG_SITUASJON')
  const { content, heading } = getSituationInfo(value)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Step heading={heading} previousStep={previousStep} nextStep={nextStep}>
      {content}
    </Step>
  )
}
