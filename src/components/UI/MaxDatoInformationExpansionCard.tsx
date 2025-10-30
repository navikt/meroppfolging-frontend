'use client'

import { ExpansionCard } from '@navikt/ds-react'

import { ISODateStringToLongFormat } from '@/utils/dateUtils'
import { logAnalyticsEvent } from '@/libs/analytics/analytics'
import { ReactElement } from 'react'

interface Props {
  maxDato: string
  utbetaltTomDato?: string | null
}

function MaxDatoInformationExpansionCard({ maxDato, utbetaltTomDato }: Props): ReactElement {
  return (
    <ExpansionCard
      size="small"
      aria-label="Informasjon om beregnet slutt-dato for sykepenger"
      onToggle={(open: boolean) => {
        logAnalyticsEvent({
          eventName: open ? 'accordion åpnet' : 'accordion lukket',
          data: {
            tekst: 'Informasjon om beregnet slutt-dato for sykepenger',
          },
        })
      }}
    >
      <ExpansionCard.Header>
        <ExpansionCard.Title size="small">Beregnet slutt på sykepenger</ExpansionCard.Title>
        <ExpansionCard.Description>
          Din maksdato er beregnet til å være {ISODateStringToLongFormat(maxDato)}. Åpne kortet for å lese mer.
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        Du kan maksimalt få sykepenger fra Nav i 52 uker. Grensen er den samme enten du er helt eller delvis sykmeldt.
        Den siste datoen du kan få sykepenger kalles maksdato.{' '}
        {utbetaltTomDato
          ? `Din maksdato ble sist oppdatert ${ISODateStringToLongFormat(
              utbetaltTomDato,
            )}. Maksdatoen gjelder fortsatt hvis du har vært sammenhengende sykmeldt og mottatt sykepenger siden da.`
          : 'Datoen gjelder hvis du er sammenhengende sykmeldt.'}{' '}
        Den vil forskyve seg til en senere dato hvis du har perioder{' '}
        {utbetaltTomDato ? `etter ${ISODateStringToLongFormat(utbetaltTomDato)}` : ''} der du ikke mottar sykepenger.
        Det kan skje hvis du er frisk i perioder eller hvis du tar ferie.
      </ExpansionCard.Content>
    </ExpansionCard>
  )
}

export default MaxDatoInformationExpansionCard
