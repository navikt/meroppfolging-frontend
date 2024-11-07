import { ExpansionCard } from '@navikt/ds-react'

import { getLongDateFormat } from '@/utils/dateUtils'

interface Props {
  maxDato: string
  utbetaltTomDato?: string | null
}

function MaxDatoInformationExpansionCard({ maxDato, utbetaltTomDato }: Props): React.ReactElement {
  return (
    <ExpansionCard size="small" aria-label="Informasjon om beregnet slutt-dato for sykepenger">
      <ExpansionCard.Header>
        <ExpansionCard.Title size="small">Beregnet slutt på sykepenger</ExpansionCard.Title>
        <ExpansionCard.Description>
          {utbetaltTomDato ? `Maksdato per ${getLongDateFormat(utbetaltTomDato)}` : 'Sist beregnede maksdato'} er{' '}
          {getLongDateFormat(maxDato)}. Åpne kortet for å lese mer.
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        Du kan maksimalt få sykepenger fra Nav i 52 uker. Grensen er den samme enten du er helt eller delvis sykmeldt.
        Den siste datoen du kan få sykepenger kalles maksdato. Datoen gjelder hvis du er sammenhengende sykmeldt. Den
        vil forskyve seg hvis du for eksempel ikke får sykepenger fra Nav i perioder, eller hvis du tar ferie.
      </ExpansionCard.Content>
    </ExpansionCard>
  )
}

export default MaxDatoInformationExpansionCard
