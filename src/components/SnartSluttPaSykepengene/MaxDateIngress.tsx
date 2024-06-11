import { Alert, BodyLong, Box, Heading, Skeleton } from '@navikt/ds-react'
import { ReactElement } from 'react'
import Link from 'next/link'
import { logger } from '@navikt/next-logger'

import { useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { trpc } from '@/utils/trpc'

function MaxDateErrorMessage({ reason }: { reason: string }): ReactElement {
  useLogAmplitudeEvent(
    {
      eventName: 'alert vist',
      data: { variant: 'error', tekst: 'Beklager, teknisk feil med maks dato' },
    },
    { grunn: reason },
  )
  logger.error(`Client: could not fetch max date. Reason: ${reason}`)

  return (
    <Alert variant="error" className="mb-8">
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

function MaxDateIngress(): ReactElement {
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
      if (maxDate.data.maxDate && maxDate.data.utbetaltTom) {
        return (
          <BodyLong size="medium">
            Per {maxDate.data.utbetaltTom} er din siste dag med sykepenger beregnet til å være{' '}
            <b>{maxDate.data.maxDate}</b>.
          </BodyLong>
        )
      } else {
        return (
          <MaxDateErrorMessage
            reason={`Missing: ${maxDate.data.maxDate ? '' : 'maks dato'} ${
              maxDate.data.utbetaltTom ? '' : 'utbetalt Tom'
            }`}
          />
        )
      }

    default:
      const exhaustiveCheck: never = maxDate
      return exhaustiveCheck
  }
}

export default MaxDateIngress
