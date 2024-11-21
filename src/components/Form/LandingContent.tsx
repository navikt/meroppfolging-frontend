import React, { ReactElement, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'
import { StatusDTO } from '@/server/services/schemas/statusSchema'
import { trpc } from '@/utils/trpc'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import { OnskerKontaktStep } from '@/components/Form/KontaktStep/OnskerKontaktStep'
import { createFormRequest } from '@/utils/requestUtils'

import NoAccessInformation from '../NoAccessInformation/NoAccessInformation'

import { FremtidigSituasjonStep } from './FremtidigSituasjonStep/FremtidigSituasjonStep'
import LandingInfoStep from './LandingInfoStep/LandingInfoStep'
import { InfoStep } from './InfoStep/InfoStep'
import Receipt from './Receipt/Receipt'

export type Step = 'LANDING' | 'FREMTIDIG_SITUASJON' | 'INFO' | 'KONTAKT'

export type FormInputs = {
  FREMTIDIG_SITUASJON: FremtidigSituasjonAnswerTypes
  BEHOV_FOR_OPPFOLGING: BehovForOppfolgingAnswerTypes
}

interface LandingContentProps {
  status: StatusDTO
}

export const LandingContent = ({ status }: LandingContentProps): ReactElement => {
  const methods = useForm<FormInputs>()
  const [currentStep, setCurrentStep] = useState<Step>('LANDING')
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

  if (!status.hasAccessToSenOppfolging) {
    return <NoAccessInformation />
  }

  if (status.response) {
    return <Receipt response={status.response} />
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setDisplayErrorMessage(false)
    const request = createFormRequest(data)
    mutation.mutate(request)
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {(() => {
            switch (currentStep) {
              case 'LANDING':
                return <LandingInfoStep nextStep={() => setCurrentStep('FREMTIDIG_SITUASJON')} />
              case 'FREMTIDIG_SITUASJON':
                return (
                  <FremtidigSituasjonStep
                    previousStep={() => setCurrentStep('LANDING')}
                    nextStep={() => setCurrentStep('INFO')}
                  />
                )
              case 'INFO':
                return (
                  <InfoStep
                    previousStep={() => setCurrentStep('FREMTIDIG_SITUASJON')}
                    nextStep={() => setCurrentStep('KONTAKT')}
                  />
                )
              case 'KONTAKT':
                return <OnskerKontaktStep previousStep={() => setCurrentStep('INFO')} />
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
