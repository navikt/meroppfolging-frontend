import React, { ReactElement } from 'react'
import { Accordion, BodyLong } from '@navikt/ds-react'

import { alleredeSoktOmPengestotteContent } from '@/components/UI/AlleredeSoktOmPengestotteExpansionCard'
import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { CONTACT_NAV_URL } from '@/constants/appConstants'

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
            <BodyLong spacing>
              Mange kan ta ut pensjon fra de er 62 år. Tidlig uttak betyr at du fordeler pensjonen din over flere år, og
              dermed får mindre utbetalt hvert år. Pensjonen blir høyere hvis du fortsetter å jobbe samtidig som du tar
              ut pensjon. Du kan jobbe så mye du vil samtidig som du tar ut alderspensjon fra folketrygden.
            </BodyLong>
            <BodyLong>
              <TrackedExternalLink href="https://www.nav.no/planlegger-pensjon">På denne siden</TrackedExternalLink> kan
              du få oversikt over hvordan pensjonen din er bygget opp og sjekke pensjonskalkulatoren.
            </BodyLong>
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
            <BodyLong spacing>
              Skal du ta ut lovfestet permisjon i forbindelse med svangerskap, fødsel, omsorg eller foreldrepermisjon,
              er det viktig at dette avklares med arbeidsgiveren din.
            </BodyLong>
            <BodyLong>
              En permisjon er midlertidig. Dette betyr at du fremdeles er ansatt og har rett og plikt til å komme
              tilbake til stillingen din når permisjonen er ferdig.
            </BodyLong>
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
          <Accordion.Content>
            <BodyLong spacing>
              Det kan være lange ventetider for å få nødvendig behandling fra helsevesenet. Hvis du ikke er ferdig med
              behandlingen din når sykepengerettighetene dine tar slutt, kan det hende du bør søke pengestøtte hos Nav.
              Dette kan for eksempel være arbeidsavklaringspenger (AAP).
            </BodyLong>
            <TrackedExternalLink href="https://www.nav.no/aap">
              Les mer her om hvem som har rett på AAP.
            </TrackedExternalLink>
          </Accordion.Content>
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
          <Accordion.Content>
            <BodyLong spacing>
              Dersom du trenger hjelp til å finne ut av hvilke muligheter du har fremover, og hva Nav kan tilby av
              pengestøtter eller annen hjelp, kan du be om oppfølging på neste side. En sykefraværsveileder vil da motta
              henvendelsen din.
            </BodyLong>

            <BodyLong>
              Dersom du lurer på noe annet kan du når som helst ta kontakt med oss på tlf. 55 55 33 33 eller på{' '}
              <TrackedExternalLink href={CONTACT_NAV_URL}>skriv til oss her på nav.no</TrackedExternalLink>
            </BodyLong>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </>
  )
}
