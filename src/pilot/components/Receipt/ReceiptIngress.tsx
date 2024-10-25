import { ReactElement } from 'react'
import { Alert, BodyShort, Heading } from '@navikt/ds-react'

function ReceiptIngress({ behovForOppfolgingAnswer }: { behovForOppfolgingAnswer: 'JA' | 'NEI' }): ReactElement {
  switch (behovForOppfolgingAnswer) {
    case 'JA':
      return (
        <>
          <Alert variant="success">Takk, svarene dine er sendt til Nav.</Alert>
          <Heading level="1" size="large">
            Vi tar kontakt med deg
          </Heading>
          <BodyShort>En veileder vil ta kontakt med deg på nav.no eller telefon.</BodyShort>
        </>
      )
    case 'NEI':
      return (
        <>
          <Alert variant="success">Takk, svarene dine er sendt til Nav.</Alert>
          <Heading level="1" size="large">
            Det kan hende du hører fra oss
          </Heading>
          <BodyShort>
            Veilederen din vil vurdere om det kan være lurt at dere snakker sammen likevel. I så fall blir du kontaktet
            på nav.no eller telefon.
          </BodyShort>
        </>
      )
    default:
      const exhaustiveCheck: never = behovForOppfolgingAnswer
      return exhaustiveCheck
  }
}

export default ReceiptIngress
