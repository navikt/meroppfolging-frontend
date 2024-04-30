import { ReactNode } from 'react'
import { Alert } from '@navikt/ds-react'

import { ResponseStatus } from '@/server/services/schemas/meroppfolgingSchema'

function ResponseStatusInfoBox({ responseStatus }: { responseStatus: ResponseStatus }): ReactNode {
  switch (responseStatus) {
    case ResponseStatus.TRENGER_OPPFOLGING:
      return <Alert variant="success">Takk! Du har svart at du behov for oppfølging. Nav vil ta kontakt med deg.</Alert>
    case ResponseStatus.TRENGER_IKKE_OPPFOLGING:
      return (
        <Alert variant="success" className="mb-7">
          Takk! Du har svart at du ikke har behov for oppfølging.
        </Alert>
      )
    case ResponseStatus.NO_RESPONSE:
      return null
    default:
      const exhaustiveCheck: never = responseStatus
      return exhaustiveCheck
  }
}

export default ResponseStatusInfoBox
