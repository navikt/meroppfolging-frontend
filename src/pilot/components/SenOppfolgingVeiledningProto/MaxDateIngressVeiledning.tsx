import { Alert, BodyLong, BodyShort, Box, Heading, Skeleton } from '@navikt/ds-react'
import { ReactElement } from 'react'
import Link from 'next/link'
import { logger } from '@navikt/next-logger'
import { isValid } from 'date-fns'

import { trpc } from '@/utils/trpc'
import { getLongDateFormat } from '@/utils/dateUtils'

function Paragraph(): ReactElement {
  return (
    <BodyShort>
      {/* Svar på disse spørsmålene så vi vet hvordan vi kan hjelpe deg med{' '}
      <b>å sikre at du har en inntekt etter at sykepengene tar slutt.</b> */}
      Vi ber deg svare på spørsmålene under for å gi deg informasjon for din situasjon, og slik at vi kan hjelpe deg
      videre dersom du ønsker det.
    </BodyShort>
  )
}

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

function MaxDateIngressVeiledning(): ReactElement {
  const maxDate = trpc.maxDate.useQuery()

  switch (maxDate.status) {
    case 'error':
      return <MaxDateErrorMessage reason="Api error" />
    case 'loading':
      return (
        <Box>
          <Skeleton variant="text" height="7rem" />
          <Skeleton variant="text" height="4rem" />
        </Box>
      )
    case 'success':
      if (!maxDate.data.maxDate || !maxDate.data.gjenstaendeSykedager) {
        return (
          <>
            <MaxDateErrorMessage reason="Missing max date or gjenstaendeSykedager" />
            <Paragraph />
          </>
        )
      }
      if (!isValid(new Date(maxDate.data.maxDate))) {
        return (
          <>
            <MaxDateErrorMessage reason="Invalid date format" />
            <Paragraph />
          </>
        )
      }

      return (
        <>
          <BodyLong size="medium">
            {getLongDateFormat(maxDate.data.maxDate)} er den siste dagen du har rett på sykepenger.{' '}
            <b>Det betyr at det er {maxDate.data.gjenstaendeSykedager} dager igjen av perioden du kan få sykepenger.</b>
          </BodyLong>
          <Paragraph />
        </>
      )

    default:
      const exhaustiveCheck: never = maxDate
      return exhaustiveCheck
  }
}

export default MaxDateIngressVeiledning
