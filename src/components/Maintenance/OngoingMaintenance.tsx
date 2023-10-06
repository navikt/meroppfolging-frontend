import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react'

function OngoingMaintenance(): React.ReactElement {
  return (
    <>
      <GuidePanel poster>
        <Heading spacing size="large" level="1">
          Vedlikehold pågår
        </Heading>

        <BodyLong>
          Arbeidssøkerregistreringen er ikke tilgjengelig på grunn av vedlikehold. Vennligst prøv igjen litt senere.
        </BodyLong>
      </GuidePanel>
    </>
  )
}

export default OngoingMaintenance
