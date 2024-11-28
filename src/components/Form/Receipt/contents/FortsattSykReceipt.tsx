import { ReactElement } from 'react'
import { Accordion, Alert, BodyLong, Button, Heading, Link, VStack } from '@navikt/ds-react'

import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'

import { TilbakeMedTilpasningerAccordionItem } from './TilbakeMedTilpasningerReceipt'
import { BytteJobbAccordionItem } from './BytteJobbReceipt'
import { TilbakeGradertAccordionItem } from './TilbakeGradertReceipt'

export function FortsattSykContent(): ReactElement {
  return (
    <>
      <BodyLong>
        Hvis du ikke er frisk nok til å gå tilbake til jobb slik som før, kan det være riktig å søke om{' '}
        <TrackedExternalLink href="https://www.nav.no/aap">arbeidsavklaringspenger (AAP)</TrackedExternalLink>, eller en
        annen økonomisk støtte. Merk at det er egne vilkår for å motta AAP, som du bør sette deg inn i før du søker.
      </BodyLong>
      <BodyLong>
        <b>Du må selv søke om AAP eller annen økonomisk støtte.</b> Dette skjer ikke automatisk.
      </BodyLong>
      <BodyLong>
        Du må være forberedt på å gå ned i inntekt når sykepengene tar slutt. Dette er fordi våre andre støtteordninger
        ikke gir like mye utbetalt som sykepenger. Husk at du også kan ha rettigheter hos forsikringsselskapet eller
        pensjonskassen din.
      </BodyLong>
      <BodyLong>
        Veileder kan hjelpe deg med å finne ut hvilken økonomisk støtte som kan være aktuelt for deg, og med
        søkeprosessen.
      </BodyLong>

      <Alert variant="info">
        <Heading size="xsmall" level="3">
          Saksbehandlingstiden for AAP-søknader er omtrent 15 uker.
        </Heading>
        <BodyLong className="mb-2">
          Hvis du bor eller oppholder deg i et annet EØS-land og får oppfølging av Nav utland, så er
          saksbehandlingstiden for AAP-søknader betydelig lenger.
        </BodyLong>
        <BodyLong>Husk å søke tidlig nok.</BodyLong>
      </Alert>

      <Link href="https://www.nav.no/start/soknad-aap" target="_blank" rel="noopener noreferrer">
        <Button
          className="w-fit"
          onClick={() => {
            logAmplitudeEvent({
              eventName: 'navigere',
              data: {
                lenketekst: 'Gå til søknaden om AAP',
                destinasjon: 'https://www.nav.no/start/soknad-aap',
              },
            })
          }}
        >
          Gå til søknaden om AAP
        </Button>
      </Link>
    </>
  )
}

export function FortsattSykAccordionItem(): ReactElement {
  return (
    <Accordion.Item>
      <Accordion.Header>Hvis du blir for syk til å jobbe</Accordion.Header>
      <Accordion.Content>
        <VStack gap="6">
          <FortsattSykContent />
        </VStack>
      </Accordion.Content>
    </Accordion.Item>
  )
}

function FortsattSykReceipt(): ReactElement {
  return (
    <>
      <Heading size="medium" level="2">
        Når du er for syk til å jobbe
      </Heading>
      <FortsattSykContent />
      <Accordion>
        <TilbakeMedTilpasningerAccordionItem />
        <TilbakeGradertAccordionItem />
        <BytteJobbAccordionItem />
      </Accordion>
    </>
  )
}

export default FortsattSykReceipt
