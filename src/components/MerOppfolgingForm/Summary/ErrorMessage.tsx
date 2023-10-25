import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import Link from 'next/link'

import { useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'

function ErrorMessage(): React.ReactElement {
  useLogAmplitudeEvent({ eventName: 'alert vist', data: { variant: 'error', tekst: 'Beklager, teknisk feil' } })

  return (
    <Alert variant="error">
      <Heading size="medium" spacing level="1">
        Beklager, teknisk feil
      </Heading>
      <BodyLong>På grunn av feil i systemene våre kan du ikke registrere deg akkurat nå.</BodyLong>
      <BodyLong spacing>Vennligst prøv igjen litt senere.</BodyLong>
      <BodyLong>
        <Link href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/kontakt-teknisk-brukerstotte-nav.no">
          Kontakt teknisk brukerstøtte dersom problemene vedvarer.
        </Link>
      </BodyLong>
    </Alert>
  )
}

export default ErrorMessage
