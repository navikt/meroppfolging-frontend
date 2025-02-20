'use client'

import React, { ReactElement, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FormProgress } from '@navikt/ds-react'
import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'
import { SenOppfolgingStatusDTO } from '@/server/schemas/statusSchema'
import { createFormRequest } from '@/utils/requestUtils'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import NoAccessInformation from '@/components/NoAccessInformation/NoAccessInformation'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { OnskerOppfolgingStep } from '@/components/Form/OppfolgingStep/OnskerOppfolgingStep'

import { FremtidigSituasjonStep } from './FremtidigSituasjonStep/FremtidigSituasjonStep'
import { InfoStep } from './InfoStep/InfoStep'
import { submitForm } from '@/server/actions/submitForm'
import { useRouter } from 'next/navigation'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
  const router = useRouter()

  if (!senOppfolgingStatus.hasAccessToSenOppfolging) {
    return <NoAccessInformation />
  }

  const goToNextStep = (): void => {
    logAmplitudeEvent(
      {
        eventName: 'skjema steg fullført',
        data: {
          skjemanavn: steps[currentStepIndex].name,
          steg: steps[currentStepIndex].number.toString(),
        },
      },
      { fremtidigSituasjon: methods.getValues().FREMTIDIG_SITUASJON },
    )
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

  const submitFormToMOBE = async (data: FormInputs): Promise<void> => {
    setIsSubmitting(true)
    logAmplitudeEvent(
      {
        eventName: 'skjema fullført',
        data: {
          skjemanavn: 'Snart slutt på sykepengene',
        },
      },
      {
        fremtidigSituasjon: methods.getValues().FREMTIDIG_SITUASJON,
        behovForOppfolging: methods.getValues().BEHOV_FOR_OPPFOLGING,
      },
    )
    const request = createFormRequest(data)

    setDisplayErrorMessage(false)
    try {
      await submitForm(request)
      const queryParams = new URLSearchParams({
        fremtidigSituasjon: data.FREMTIDIG_SITUASJON,
        behovForOppfolging: data.BEHOV_FOR_OPPFOLGING,
      }).toString()

      router.push(`/snart-slutt-pa-sykepengene/kvittering?${queryParams}`)
    } catch (e) {
      setDisplayErrorMessage(true)
    } finally {
      setIsSubmitting(false)
    }
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
                return <OnskerOppfolgingStep goToPreviousStep={goToPreviousStep} isSubmitting={isSubmitting} />
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
