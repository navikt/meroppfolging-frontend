import { ReactElement } from 'react'
import { Accordion, Alert, BodyLong, Button, Heading, Link, VStack } from '@navikt/ds-react'

import { BytteJobbAccordionItem } from '@/pilot/components/Receipt/contents/BytteJobbReceipt'
import { TilbakeMedTilpasningerAccordionItem } from '@/pilot/components/Receipt/contents/TilbakeMedTilpasningerReceipt'
import { TilbakeGradertAccordionItem } from '@/pilot/components/Receipt/contents/TilbakeGradertReceipt'

export function FortsattSykContent(): ReactElement {
  return (
    <>
      <BodyLong>
        Hvis du ikke er frisk nok til å gå tilbake til jobb slik som før, kan det være riktig å søke om{' '}
        <Link href="https://www.nav.no/aap" target="_blank" rel="noopener noreferrer">
          arbeidsavklaringspenger (AAP)
        </Link>
        , eller en annen økonomisk støtte.
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
          Saksbehandlingstiden på AAP-søknader er beregnet til 15 uker.
        </Heading>
        Søk tidlig nok slik at du sikrer at du har inntekt etter at sykepengene tar slutt.
      </Alert>

      <Link href="https://www.nav.no/start/soknad-aap" target="_blank" rel="noopener noreferrer">
        <Button className="w-fit">Gå til søknaden om AAP</Button>
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
