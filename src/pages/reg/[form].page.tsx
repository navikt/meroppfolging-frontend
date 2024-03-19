import { ReactElement } from 'react'
import { Loader } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'

import { withAuthenticatedPage } from '@/auth'
import MerOppfolgingForm from '@/components/MerOppfolgingForm/MerOppfolgingForm'
import { MerOppfolgingFormProvider } from '@/contexts/formContext'
import { trpc } from '@/utils/trpc'
import { RegisttrationTypes } from '@/server/services/schemas/registreringSchema'
import OtherRegistrationTypes from '@/components/OtherRegistrationTypes/OtherRegistrationTypes'
import { useToggle } from '@/contexts/toggleContext'
import OngoingMaintenance from '@/components/Maintenance/OngoingMaintenance'
import { useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import FormPageContainer from '@/components/Containers/FormPageContainer'

function StartRegistrationErrorMessage(): React.ReactElement {
  useLogAmplitudeEvent({ eventName: 'alert vist', data: { variant: 'error', tekst: 'Beklager, teknisk feil' } })

  return <ErrorMessage />
}

function Content(): ReactElement {
  const disableMerOppfolgingRegistreringToggle = useToggle('disableMerOppfolgingRegistering')
  const startRegistration = trpc.startRegistration.useQuery()

  if (disableMerOppfolgingRegistreringToggle.enabled) {
    return <OngoingMaintenance />
  }

  switch (startRegistration.status) {
    case 'loading':
      return <Loader size="3xlarge" title="Laster..." className="self-center py-24" />

    case 'error':
      logger.error('Error while fetching startRegistration', startRegistration.error)
      return <StartRegistrationErrorMessage />

    case 'success': {
      const { registreringType } = startRegistration.data.registrationType
      const { sykmeldt } = startRegistration.data

      if (registreringType !== RegisttrationTypes.SYKMELDT_REGISTRERING || !sykmeldt) {
        return <OtherRegistrationTypes type={registreringType} />
      }

      return (
        <MerOppfolgingFormProvider>
          <MerOppfolgingForm />
        </MerOppfolgingFormProvider>
      )
    }
    default: {
      const exchasutiveCheck: never = startRegistration
      return exchasutiveCheck
    }
  }
}

function FormPage(): ReactElement {
  return (
    <FormPageContainer>
      <Content />
    </FormPageContainer>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default FormPage
