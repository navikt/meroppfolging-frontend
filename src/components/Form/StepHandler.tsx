import React, { ReactElement, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { FormProgress } from '@navikt/ds-react'

import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'
import { SenOppfolgingStatusDTO } from '@/server/services/schemas/statusSchema'
import { trpc } from '@/utils/trpc'
import { createFormRequest } from '@/utils/requestUtils'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import NoAccessInformation from '@/components/NoAccessInformation/NoAccessInformation'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { OnskerOppfolgingStep } from '@/components/Form/OppfolgingStep/OnskerOppfolgingStep'

import { FremtidigSituasjonStep } from './FremtidigSituasjonStep/FremtidigSituasjonStep'
import { InfoStep } from './InfoStep/InfoStep'
import Receipt from './Receipt/Receipt'

type Step = { number: number; name: 'FREMTIDIG_SITUASJON' | 'INFO' | 'KONTAKT' }

export type FormInputs = {
  FREMTIDIG_SITUASJON: FremtidigSituasjonAnswerTypes
  BEHOV_FOR_OPPFOLGING: BehovForOppfolgingAnswerTypes
}

interface LandingContentProps {
  senOppfolgingStatus: SenOppfolgingStatusDTO
}

const steps: Step[] = [
  { number: 1, name: 'FREMTIDIG_SITUASJON' },
  { number: 2, name: 'INFO' },
  { number: 3, name: 'KONTAKT' },
]

export const StepHandler = ({ senOppfolgingStatus }: LandingContentProps): ReactElement => {
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
    logAmplitudeEvent({
      eventName: 'skjema steg fullført',
      data: {
        skjemanavn: steps[currentStepIndex].name,
        steg: steps[currentStepIndex].number.toString(),
      },
    })
    setCurrentStepIndex(currentStepIndex + 1)
  }

  const goToPreviousStep = (): void => {
    logAmplitudeEvent({
      eventName: 'navigere',
      data: {
        lenketekst: 'Forrige',
        destinasjon: steps[currentStepIndex - 1].name,
      },
    })
    setCurrentStepIndex(currentStepIndex - 1)
  }

  const submitFormToMOBE = (data: FormInputs): void => {
    logAmplitudeEvent({
      eventName: 'skjema fullført',
      data: {
        skjemanavn: 'Snart slutt på sykepengene',
      },
    })
    const request = createFormRequest(data)
    mutation.mutate(request)
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setDisplayErrorMessage(false)
    if (steps[currentStepIndex].name === 'KONTAKT') {
      submitFormToMOBE(data)
    } else {
      goToNextStep()
    }
  }

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormProgress totalSteps={3} activeStep={steps[currentStepIndex].number} className="pb-6">
            <FormProgress.Step>Fremtidig situasjon</FormProgress.Step>
            <FormProgress.Step>Informasjon</FormProgress.Step>
            <FormProgress.Step>Oppfølging</FormProgress.Step>
          </FormProgress>

          {(() => {
            switch (steps[currentStepIndex].name) {
              case 'FREMTIDIG_SITUASJON':
                return <FremtidigSituasjonStep />
              case 'INFO':
                return <InfoStep goToPreviousStep={goToPreviousStep} />
              case 'KONTAKT':
                return <OnskerOppfolgingStep goToPreviousStep={goToPreviousStep} />
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
