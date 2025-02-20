import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { ReactElement } from 'react'
import Link from 'next/link'
import { logger } from '@navikt/next-logger'

import MaxDatoInformationExpansionCard from '@/components/UI/MaxDatoInformationExpansionCard'
import { MaxDateDTO } from '@/server/schemas/sykepengedagerInformasjonSchema'

function MaxDateErrorMessage({ reason }: { reason: string }): ReactElement {
  logger.error(`Client: could not fetch max date. Reason: ${reason}`)

  return (
    <Alert variant="error">
      <Heading size="medium" spacing level="1">
        Beklager, teknisk feil
      </Heading>
      <BodyLong>På grunn av feil i systemene våre får vi ikke vist deg beregnet siste dag med sykepenger.</BodyLong>
      <BodyLong spacing>Vennligst prøv igjen litt senere.</BodyLong>
      <BodyLong>
        <Link href="https://www.nav.no/no/nav-og-samfunn/kontakt-nav/teknisk-brukerstotte/kontakt-teknisk-brukerstotte-nav.no">
          Kontakt teknisk brukerstøtte dersom problemene vedvarer.
        </Link>
      </BodyLong>
    </Alert>
  )
}

interface Props {
  maxDate: MaxDateDTO
}

function MaxDateInfo({ maxDate }: Props): ReactElement {
  if (!maxDate.maxDate || !maxDate.utbetaltTom) {
    return <MaxDateErrorMessage reason="Missing max date or utbetalt tom" />
  }

  return (
    <>
      <MaxDatoInformationExpansionCard utbetaltTomDato={maxDate.utbetaltTom} maxDato={maxDate.maxDate} />
    </>
  )
}

export default MaxDateInfo
