import React, { ReactElement, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { FormProgress } from '@navikt/ds-react'

import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'
import { SenOppfolgingStatusDTO } from '@/server/services/schemas/statusSchema'
import { trpc } from '@/utils/trpc'
import { createFormRequest } from '@/utils/requestUtils'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import { OnskerKontaktStep } from '@/components/Form/KontaktStep/OnskerKontaktStep'
import NoAccessInformation from '@/components/NoAccessInformation/NoAccessInformation'

import { FremtidigSituasjonStep } from './FremtidigSituasjonStep/FremtidigSituasjonStep'
import LandingInfoStep from './LandingInfoStep/LandingInfoStep'
import { InfoStep } from './InfoStep/InfoStep'
import Receipt from './Receipt/Receipt'

type Step = { number: number; name: 'LANDING' | 'FREMTIDIG_SITUASJON' | 'INFO' | 'KONTAKT' }

export type FormInputs = {
  FREMTIDIG_SITUASJON: FremtidigSituasjonAnswerTypes
  BEHOV_FOR_OPPFOLGING: BehovForOppfolgingAnswerTypes
}

interface LandingContentProps {
  senOppfolgingStatus: SenOppfolgingStatusDTO
}

const steps: Step[] = [
  { number: 1, name: 'LANDING' },
  { number: 2, name: 'FREMTIDIG_SITUASJON' },
  { number: 3, name: 'INFO' },
  { number: 4, name: 'KONTAKT' },
]

export const LandingContent = ({ senOppfolgingStatus }: LandingContentProps): ReactElement => {
  const methods = useForm<FormInputs>()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
  const { reload } = useRouter()

  const mutation = trpc.submitForm.useMutation({
    onError: () => {
      setDisplayErrorMessage(true)
    },
    onSuccess: () => {
      reload()
    },
  })

  if (!senOppfolgingStatus.hasAccessToSenOppfolging) {
    return <NoAccessInformation />
  }

  if (senOppfolgingStatus.response) {
    return <Receipt response={senOppfolgingStatus.response} />
  }

  const goToNextStep = (): void => {
    setCurrentStepIndex((prevIndex) => Math.min(prevIndex + 1, steps.length - 1))
  }

  const goToPreviousStep = (): void => {
    setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0))
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setDisplayErrorMessage(false)
    if (steps[currentStepIndex].name === 'KONTAKT') {
      const request = createFormRequest(data)
      mutation.mutate(request)
    } else {
      goToNextStep()
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {currentStepIndex > 0 && (
            <FormProgress totalSteps={3} activeStep={currentStepIndex}>
              <FormProgress.Step>Fremtidig situasjon</FormProgress.Step>
              <FormProgress.Step>Informasjon</FormProgress.Step>
              <FormProgress.Step>Kontakt</FormProgress.Step>
            </FormProgress>
          )}

          {(() => {
            switch (steps[currentStepIndex].name) {
              case 'LANDING':
                return <LandingInfoStep />
              case 'FREMTIDIG_SITUASJON':
                return <FremtidigSituasjonStep goToPreviousStep={goToPreviousStep} />
              case 'INFO':
                return <InfoStep goToPreviousStep={goToPreviousStep} />
              case 'KONTAKT':
                return <OnskerKontaktStep goToPreviousStep={goToPreviousStep} />
              default:
                return null
            }
          })()}
        </form>
      </FormProvider>
      {displayErrorMessage && <ErrorMessage />}
    </>
  )
}
