import { ReactElement, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { BodyLong, Button, Link, VStack } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

import NestedRadioGroup from '@/pilot/components/FormComponents/NestedRadioGroup'
import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/pilot/domain/answerValues'
import { createFormRequest } from '@/pilot/components/SenOppfolging/requestUtils'
import { trpc } from '@/utils/trpc'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import NeedForHelpInfoBox from '@/pilot/components/SenOppfolging/NeedForHelpInfoBox'
import { CONTACT_NAV_URL, NAV_PHONE_NUMBER } from '@/constants/paths'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'

export type FormInputs = {
  FREMTIDIG_SITUASJON: FremtidigSituasjonAnswerTypes
  BEHOV_FOR_OPPFOLGING: BehovForOppfolgingAnswerTypes
}

const Description = (): ReactElement => {
  const contactUsText = 'skriv til oss på nav.no.'

  return (
    <>
      <BodyLong>
        Sammen kan dere kartlegge mulighetene dine, og vurdere hvilken hjelp og støtte du kan få fra Nav.
      </BodyLong>
      <BodyLong>
        Har du andre spørsmål kan du når som helst ta kontakt med oss på tlf. {NAV_PHONE_NUMBER} eller på{' '}
        <Link
          as={NextLink}
          target="_blank"
          href={CONTACT_NAV_URL}
          onClick={() =>
            logAmplitudeEvent(
              {
                eventName: 'navigere',
                data: {
                  lenketekst: contactUsText,
                  destinasjon: 'Nav.no - skriv til oss',
                },
              },
              { fra: 'Pilot landingsside' },
            )
          }
        >
          {contactUsText}
        </Link>
      </BodyLong>
      <BodyLong>Har du en aktivitetsplan, bruker du “dialog med veileder” for å snakke med veilederen din.</BodyLong>
    </>
  )
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
          <NestedRadioGroup name="BEHOV_FOR_OPPFOLGING" description={<Description />}>
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
