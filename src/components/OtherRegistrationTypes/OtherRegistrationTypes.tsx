import { RegisttrationTypes } from '@/server/services/schemas/registreringSchema'

import AlreadyRegistred from './AlreadyRegistred'
import OtherRegistrations from './OtherRegistrations'

function RenderContent({ type }: { type: string }): React.ReactElement {
  switch (type) {
    case RegisttrationTypes.ALLEREDE_REGISTRERT:
      return <AlreadyRegistred />
    default:
      return <OtherRegistrations />
  }
}

function OtherRegistrationTypes({ type }: { type: string }): React.ReactElement {
  return <RenderContent type={type} />
}

export default OtherRegistrationTypes
