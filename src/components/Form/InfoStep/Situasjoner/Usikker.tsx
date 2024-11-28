import React, { ReactElement } from 'react'
import { Accordion, BodyLong, BodyShort } from '@navikt/ds-react'

import { alleredeSoktOmPengestotteContent } from '@/components/UI/AlleredeSoktOmPengestotteExpansionCard'
import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

export const Usikker = (): ReactElement => {
  return (
    <>
      <BodyLong>Her har vi samlet litt informasjon om andre situasjoner som kan være aktuelle for deg.</BodyLong>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>Jeg har allerede søkt om AAP eller en annen pengestøtte</Accordion.Header>
          <Accordion.Content>{alleredeSoktOmPengestotteContent}</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>Jeg planlegger å ta ut pensjon</Accordion.Header>
          <Accordion.Content>
            <BodyShort spacing>[Informasjon]</BodyShort>
            <BodyShort>
              På <TrackedExternalLink href="https://www.nav.no/planlegger-pensjon">denne siden</TrackedExternalLink> kan
              du få oversikt over hvordan pensjonen din er bygget opp og sjekke pensjonskalkulatoren.
            </BodyShort>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>Jeg skal i permisjon</Accordion.Header>
          <Accordion.Content>
            <BodyShort>
              Permisjon er en rett for arbeidstaker til å være borte fra arbeidet sitt i et begrenset tidsrom. Permisjon
              kan være lønnet - helt eller delvis - eller ulønnet. Husk at dette må avklares med arbeidsgiveren din.
            </BodyShort>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>Jeg venter på behandling og er usikker på min fremtidige situasjon</Accordion.Header>
          <Accordion.Content>Informasjon</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item>
          <Accordion.Header>Jeg har andre spørsmål</Accordion.Header>
          <Accordion.Content>Du kan kontakte Nav [...]</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  )
}
