import { ReactElement } from 'react'
import { Loader } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'

import { withAuthenticatedPage } from '@/auth'
import MerOppfolgingForm from '@/components/MerOppfolgingForm/MerOppfolgingForm'
import { MerOppfolgingFormProvider } from '@/contexts/formContext'
import { trpc } from '@/utils/trpc'
import OtherRegistrationTypes from '@/components/OtherRegistrationTypes/OtherRegistrationTypes'
import { useToggle } from '@/contexts/toggleContext'
import OngoingMaintenance from '@/components/Maintenance/OngoingMaintenance'
import { useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import FormPageContainer from '@/components/Containers/FormPageContainer'
import { RegistrationTypes } from '@/server/services/schemas/meroppfolgingSchema'
import AlreadyResponded from '@/components/OtherRegistrationTypes/AlreadyResponded'

function StatusErrorMessage(): React.ReactElement {
  useLogAmplitudeEvent({ eventName: 'alert vist', data: { variant: 'error', tekst: 'Beklager, teknisk feil' } })

  return <ErrorMessage />
}

function Content(): ReactElement {
  const disableMerOppfolgingRegistreringToggle = useToggle('disableMerOppfolgingRegistering')
  const sykmeldtStatus = trpc.sykmeldtStatus.useQuery()

  if (disableMerOppfolgingRegistreringToggle.enabled) {
    return <OngoingMaintenance />
  }

  switch (sykmeldtStatus.status) {
    case 'loading':
      return <Loader size="3xlarge" title="Laster..." className="self-center py-24" />

    case 'error':
      logger.error('Error while fetching status', sykmeldtStatus.error)
      return <StatusErrorMessage />

    case 'success': {
      const { registrationType, responseStatus } = sykmeldtStatus.data
      const sykmeldt = sykmeldtStatus.data.isSykmeldt

      if (registrationType !== RegistrationTypes.SYKMELDT_REGISTRERING || !sykmeldt) {
        return <OtherRegistrationTypes type={registrationType} />
      }
      if (responseStatus !== 'NO_RESPONSE') {
        return <AlreadyResponded />
      }

      return (
        <MerOppfolgingFormProvider>
          <MerOppfolgingForm />
        </MerOppfolgingFormProvider>
      )
    }
    default: {
      const exchasutiveCheck: never = sykmeldtStatus
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
