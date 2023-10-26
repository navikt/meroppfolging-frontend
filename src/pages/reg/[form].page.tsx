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
import ErrorMessageWithAmplitude from '@/components/ErrorMessage/ErrorMessageWithAmplitude'

function Page(): ReactElement {
  const disableMerOppfolgingRegistreringToggle = useToggle('disableMerOppfolgingRegistering')
  const startRegistration = trpc.startRegistration.useQuery()

  if (startRegistration.isLoading) {
    return <Loader size="3xlarge" title="Laster..." className="self-center py-24" />
  }
  if (startRegistration.isError) {
    logger.error('Error while fetching startRegistration', startRegistration.error)
    return <ErrorMessageWithAmplitude />
  }

  if (disableMerOppfolgingRegistreringToggle.enabled) {
    return <OngoingMaintenance />
  }

  const { registreringType } = startRegistration.data

  if (registreringType !== RegisttrationTypes.SYKMELDT_REGISTRERING) {
    return <OtherRegistrationTypes type={registreringType} />
  }

  return (
    <MerOppfolgingFormProvider>
      <MerOppfolgingForm />
    </MerOppfolgingFormProvider>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default Page
