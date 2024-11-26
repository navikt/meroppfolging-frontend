import { BodyShort, ExpansionCard } from '@navikt/ds-react'

export const alleredeSoktOmPengestotteContent = (
  <>
    <BodyShort spacing>Dette skjemaet her har ikke informasjon om du har søkt på andre pengestøtter.</BodyShort>
    <BodyShort spacing>
      Hvis du har søkt om en pengestøtte vil ikke svarene dine her ha noen innvirkning på behandlingen av søknaden din.
    </BodyShort>
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
