import { ReactElement, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Button, VStack } from '@navikt/ds-react'
import { useRouter } from 'next/router'

import NestedRadioGroup from '@/pilot/components/FormComponents/NestedRadioGroup'
import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/pilot/domain/answerValues'
import { createFormRequest } from '@/pilot/components/SenOppfolging/requestUtils'
import { trpc } from '@/utils/trpc'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import NeedForHelpInfoBox from '@/pilot/components/SenOppfolging/NeedForHelpInfoBox'

export type FormInputs = {
  FREMTIDIG_SITUASJON: FremtidigSituasjonAnswerTypes
  BEHOV_FOR_OPPFOLGING: BehovForOppfolgingAnswerTypes
}

function SenOppfolgingForm(): ReactElement {
  const methods = useForm<FormInputs>()
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
  const { reload } = useRouter()

  const mutation = trpc.submitPilotForm.useMutation({
    onError: () => {
      setDisplayErrorMessage(true)
    },
    onSuccess: () => {
      reload()
    },
  })

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setDisplayErrorMessage(false)
    const request = createFormRequest(data)
    mutation.mutate(request)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <VStack gap="8">
          <NestedRadioGroup name="FREMTIDIG_SITUASJON" />
          <NestedRadioGroup
            name="BEHOV_FOR_OPPFOLGING"
            description="En veileder kan hjelpe deg på veien videre. Sammen kan dere kartlegge mulighetene dine, og vurdere hvilken hjelp og støtte du kan få fra NAV."
          >
            <NeedForHelpInfoBox />
          </NestedRadioGroup>
          {displayErrorMessage && <ErrorMessage />}
        </VStack>
        <Button className="w-fit mt-6" loading={mutation.isLoading}>
          Send svarene
        </Button>
      </form>
    </FormProvider>
  )
}

export default SenOppfolgingForm
