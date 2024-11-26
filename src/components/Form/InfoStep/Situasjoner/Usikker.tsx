import { Accordion, BodyLong, BodyShort } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export const Usikker = (): ReactElement => {
  return (
    <>
      <BodyLong>Her har vi samlet litt informasjon om andre situasjoner som kan være aktuelle for deg.</BodyLong>
      <Accordion>
        <Accordion.Item>
          <Accordion.Header>Jeg skal gå av med pensjon</Accordion.Header>
          <Accordion.Content>Pensjon</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Jeg skal i permisjon</Accordion.Header>
          <Accordion.Content>Permisjon</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header>Jeg har allerede søkt om AAP eller en annen pengestøtte</Accordion.Header>
          <Accordion.Content>
            {' '}
            <BodyShort spacing>
              Hvis du allerede har søkt om AAP eller en annen pengestøtte vil ikke svarene dine her ha noen innvirkning
              på behandlingen av søknaden din.
            </BodyShort>
            <BodyShort spacing>
              Hvis du har søkt om AAP og ønsker å se status for din søknad, kan du gjøre det ved å [gå hit].
            </BodyShort>
            <BodyShort>Mer informasjon?</BodyShort>
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
