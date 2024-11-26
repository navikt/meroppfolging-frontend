import { BodyShort, ExpansionCard } from '@navikt/ds-react'

function AlleredeSoktOmPengestotteExpansionCard(): React.ReactElement {
  return (
    <ExpansionCard size="small" aria-label="Informasjon om beregnet slutt-dato for sykepenger">
      <ExpansionCard.Header>
        <ExpansionCard.Title size="small">Har du allerede søkt om AAP eller en annen pengestøtte?</ExpansionCard.Title>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        <BodyShort spacing>
          Hvis du allerede har søkt om AAP eller en annen pengestøtte vil ikke svarene dine her ha noen innvirkning på
          behandlingen av søknaden din.
        </BodyShort>
        <BodyShort spacing>
          Hvis du har søkt om AAP og ønsker å se status for din søknad, kan du gjøre det ved å [gå hit].
        </BodyShort>
        <BodyShort>Mer informasjon?</BodyShort>
      </ExpansionCard.Content>
    </ExpansionCard>
  )
}

export default AlleredeSoktOmPengestotteExpansionCard
