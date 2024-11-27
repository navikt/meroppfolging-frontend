import React, { ReactElement } from 'react'
import { Accordion, BodyLong, BodyShort, Link } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { alleredeSoktOmPengestotteContent } from '@/components/UI/AlleredeSoktOmPengestotteExpansionCard'

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
          <Accordion.Header>Jeg planlegger å gå av med pensjon</Accordion.Header>
          <Accordion.Content>
            <BodyShort spacing>[Informasjon]</BodyShort>
            <BodyShort>
              På{' '}
              <Link href="https://www.nav.no/planlegger-pensjon" target="_blank">
                denne siden <ExternalLinkIcon title="åpner i ny fane" />
              </Link>{' '}
              (åpner i en ny fane) kan du få oversikt over hvordan pensjonen din er bygget opp og sjekke
              pensjonskalkulatoren.
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
