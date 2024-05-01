import { Alert } from '@navikt/ds-react'
import { ReactElement } from 'react'

function AlreadySubmittedMessage(): ReactElement {
  return <Alert variant="warning">Du er allerede registert.</Alert>
}

export default AlreadySubmittedMessage
