import React, { ReactElement, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { FremtidigSituasjonStep } from '@/components/OtherForm/FremtidigSituasjon/FremtidigSituasjonStep'
import { OtherInfo } from '@/components/OtherForm/Info/OtherInfo'
import { OnskerKontaktStep } from '@/components/OtherForm/Kontakt/OnskerKontaktStep'
import LandingInfoStep from '@/components/OtherForm/LandingInfo/LandingInfoStep'
import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'
import { StatusDTO } from '@/server/services/schemas/statusSchema'
import Receipt from '@/components/Receipt/Receipt'
import { trpc } from '@/utils/trpc'
import { createFormRequest } from '@/components/SenOppfolging/requestUtils'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'

import NoAccessInformation from '../NoAccessInformation/NoAccessInformation'

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
          {currentStep === 'FREMTIDIG_SITUASJON' && (
            <FremtidigSituasjonStep
              previousStep={() => setCurrentStep('LANDING')}
              nextStep={() => setCurrentStep('INFO')}
            />
          )}
          {currentStep === 'KONTAKT' && <OnskerKontaktStep previousStep={() => setCurrentStep('INFO')} />}

          {currentStep === 'LANDING' && <LandingInfoStep nextStep={() => setCurrentStep('FREMTIDIG_SITUASJON')} />}
          {currentStep === 'INFO' && (
            <OtherInfo
              previousStep={() => setCurrentStep('FREMTIDIG_SITUASJON')}
              nextStep={() => setCurrentStep('KONTAKT')}
            />
          )}
        </form>
      </FormProvider>
      {displayErrorMessage && <ErrorMessage />}
    </>
  )
}
