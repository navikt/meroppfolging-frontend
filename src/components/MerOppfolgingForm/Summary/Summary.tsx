import { Button, GuidePanel, Heading, Ingress } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { logger } from '@navikt/next-logger'

import FormBackLink from '../FormComponents/FormBackLink'
import { getFormNavigation } from '../formStateMachine'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'

import { completeRegistrationRequestMapper } from './completeRegistrationRequestMapper'
import SummaryTable from './SummaryTable'

import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { FormSummaryPages } from '@/types/merOppfolgingForm'
import { trpc } from '@/utils/trpc'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { FORM_NAME } from '@/domain/formPages'

function Summary(): React.ReactElement {
  const { formState } = useMerOppfolgingFormContext()
  const { previous } = getFormNavigation(FormSummaryPages.summary, formState)
  const router = useRouter()

  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)

  const mutation = trpc.completeRegistration.useMutation({
    onMutate: () => {
      logAmplitudeEvent({ eventName: 'skjema innsending startet', data: { skjemanavn: FORM_NAME } })
    },
    onError: () => {
      logAmplitudeEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn: FORM_NAME } })
      logger.error(`Client: Error completing registration. Payload: ${JSON.stringify(formState)}`)
      setDisplayErrorMessage(true)
    },
    onSuccess: () => {
      logAmplitudeEvent({ eventName: 'skjema fullført', data: { skjemanavn: FORM_NAME } })
      push('/reg/kvittering')
    },
  })

  const handleSubmit = (): void => {
    const formRequest = completeRegistrationRequestMapper(formState)

    mutation.mutate(formRequest)
  }

  return (
    <>
      <FormBackLink formPage={previous} />
      <div>
        <Heading size="medium" level="1" spacing>
          Er opplysningene riktige?
        </Heading>
        <Ingress>Her er opplysningene vi har registrert om deg.</Ingress>
      </div>
      <GuidePanel poster>
        <SummaryTable state={formState} />
      </GuidePanel>
      {displayErrorMessage && <ErrorMessage />}
      <Button className="w-fit" onClick={handleSubmit} loading={mutation.isLoading}>
        Fullfør
      </Button>
    </>
  )
}

export default Summary
