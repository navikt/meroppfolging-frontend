import { BodyShort, ExpansionCard } from '@navikt/ds-react'

export const alleredeSoktOmPengestotteContent = (
  <>
    <BodyShort spacing>
      Denne informasjonen deles med alle som nærmer seg slutten på sykepengene. Dette er uavhengig av om du allerede har
      søkt om AAP eller en annen pengestøtte.
    </BodyShort>
    <BodyShort spacing>
      Hvis du har søkt om en pengestøtte vil ikke svarene dine her ha noen innvirkning på behandlingen av søknaden din.
    </BodyShort>
    <BodyShort spacing>
      Hvis du har søkt om AAP og ønsker å se status for din søknad, kan du gjøre det ved å [gå hit].
    </BodyShort>
    <BodyShort>[Mer informasjon?]</BodyShort>
  </>
)

function AlleredeSoktOmPengestotteExpansionCard(): React.ReactElement {
  return (
    <ExpansionCard size="small" aria-label="Informasjon om beregnet slutt-dato for sykepenger">
      <ExpansionCard.Header>
        <ExpansionCard.Title size="small">Har du allerede søkt om AAP eller en annen pengestøtte?</ExpansionCard.Title>
      </ExpansionCard.Header>
      <ExpansionCard.Content>{alleredeSoktOmPengestotteContent}</ExpansionCard.Content>
    </ExpansionCard>
  )
}

export default AlleredeSoktOmPengestotteExpansionCard
