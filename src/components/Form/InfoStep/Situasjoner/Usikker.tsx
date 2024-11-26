import React, { ReactElement } from 'react'
import { Accordion, BodyLong, BodyShort } from '@navikt/ds-react'

import { alleredeSoktOmPengestotteContent } from '@/components/UI/AlleredeSoktOmPengestotteExpansionCard'
import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'

export const Usikker = (): ReactElement => {
  return (
    <>
      <BodyLong>Her har vi samlet litt informasjon som kan være relevant for deg.</BodyLong>
      <Accordion>
        <Accordion.Item
          onOpenChange={(open) => {
            logAmplitudeEvent({
              eventName: open ? 'accordion åpnet' : 'accordion lukket',
              data: {
                tekst: 'Jeg har allerede søkt om AAP eller en annen pengestøtte',
              },
            })
          }}
        >
          <Accordion.Header>Jeg har allerede søkt om AAP eller en annen pengestøtte</Accordion.Header>
          <Accordion.Content>{alleredeSoktOmPengestotteContent}</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item
          onOpenChange={(open) => {
            logAmplitudeEvent({
              eventName: open ? 'accordion åpnet' : 'accordion lukket',
              data: {
                tekst: 'Jeg planlegger å ta ut pensjon',
              },
            })
          }}
        >
          <Accordion.Header>Jeg planlegger å ta ut pensjon</Accordion.Header>
          <Accordion.Content>
            <BodyShort>
              På <TrackedExternalLink href="https://www.nav.no/planlegger-pensjon">denne siden</TrackedExternalLink> kan
              du få oversikt over hvordan pensjonen din er bygget opp og sjekke pensjonskalkulatoren.
            </BodyShort>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item
          onOpenChange={(open) => {
            logAmplitudeEvent({
              eventName: open ? 'accordion åpnet' : 'accordion lukket',
              data: {
                tekst: 'Jeg skal i permisjon',
              },
            })
          }}
        >
          <Accordion.Header>Jeg skal i permisjon</Accordion.Header>
          <Accordion.Content>
            <BodyShort>
              Permisjon er en rett for arbeidstaker til å være borte fra arbeidet sitt i et begrenset tidsrom. Permisjon
              kan være lønnet - helt eller delvis - eller ulønnet. Husk at dette må avklares med arbeidsgiveren din.
            </BodyShort>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item
          onOpenChange={(open) => {
            logAmplitudeEvent({
              eventName: open ? 'accordion åpnet' : 'accordion lukket',
              data: {
                tekst: 'Jeg venter på behandling og er usikker på min fremtidige situasjon',
              },
            })
          }}
        >
          <Accordion.Header>Jeg venter på behandling og er usikker på min fremtidige situasjon</Accordion.Header>
          <Accordion.Content>Informasjon</Accordion.Content>
        </Accordion.Item>

        <Accordion.Item
          onOpenChange={(open) => {
            logAmplitudeEvent({
              eventName: open ? 'accordion åpnet' : 'accordion lukket',
              data: {
                tekst: 'Jeg har andre spørsmål',
              },
            })
          }}
        >
          <Accordion.Header>Jeg har andre spørsmål</Accordion.Header>
          <Accordion.Content>Du kan kontakte Nav [...]</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  )
}
