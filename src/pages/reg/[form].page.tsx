import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import MerOppfolgingForm from '@/components/MerOppfolgingForm/MerOppfolgingForm'
import { MerOppfolgingFormProvider } from '@/contexts/formContext'
import { trpc } from '@/utils/trpc'
import { RegisttrationTypes } from '@/server/services/schemas/registreringSchema'
import OtherRegistrationTypes from '@/components/OtherRegistrationTypes/OtherRegistrationTypes'
import { useToggle } from '@/contexts/toggleContext'
import OngoingMaintenance from '@/components/Maintenance/OngoingMaintenance'

function Page(): ReactElement {
  const disableMerOppfolgingRegistreringToggle = useToggle('disableMerOppfolgingRegistering')
  const startRegistration = trpc.startRegistration.useQuery()

  if (startRegistration.isLoading) {
    return <div>loading</div>
  }
  if (startRegistration.isError) {
    return <div>error</div>
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
