import { Alert, BodyLong, Box, Heading, Skeleton } from '@navikt/ds-react'
import { ReactElement } from 'react'
import Link from 'next/link'

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

function MaxDateContent(): ReactElement {
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
          <BodyLong size="medium" spacing>
            Per {maxDate.data.utbetaltTom} er det beregnet at din siste dag med sykepenger er {maxDate.data.maxDate}.
            Datoen gjelder hvis du er sykmeldt uten opphold. Den vil flytte seg hvis du for eksempel jobber noen
            perioder, eller hvis du tar ferie. Du kan få sykepenger i maksimalt 52 uker, og for deg vil det si at denne
            datoen nå nærmer seg.
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
function MaxDateIngress(): ReactElement {
  return (
    <Box>
      <MaxDateContent />
      <BodyLong size="medium">
        Hvis du er usikker på om du er tilbake i arbeid innen sykepengene tar slutt, er det viktig at du planlegger
        framover slik at du ikke risikerer å stå uten inntekt.
      </BodyLong>
    </Box>
  )
}

export default MaxDateIngress
