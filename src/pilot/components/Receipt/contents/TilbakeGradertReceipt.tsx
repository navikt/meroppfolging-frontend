import { ReactElement } from 'react'
import { Accordion, BodyShort, Heading, Link, VStack } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { TilbakeMedTilpasningerAccordionItem } from '@/pilot/components/Receipt/contents/TilbakeMedTilpasningerReceipt'
import { BytteJobbAccordionItem } from '@/pilot/components/Receipt/contents/BytteJobbReceipt'
import { FortsattSykAccordionItem } from '@/pilot/components/Receipt/contents/FortsattSykReceipt'

export function TilbakeGradertContent(): ReactElement {
  return (
    <>
      <BodyShort spacing>
        Hvis du skal jobbe redusert fordi du har en sykdom eller skade, kan det hende at du har rett på{' '}
        <Link href="https://www.nav.no/aap" target="_blank" rel="noopener noreferrer">
          arbeidsavklaringspenger (AAP) <ExternalLinkIcon />
        </Link>{' '}
        (åpner i ny fane), eller en annen økonomisk støtte.
      </BodyShort>

      <BodyShort spacing>
        Les mer om{' '}
        <Link href=" https://www.nav.no/jobbe-noe#pengestotte" target="_blank" rel="noopener noreferrer">
          aktuelle pengestøtter <ExternalLinkIcon />
        </Link>{' '}
        (åpner i ny fane).
      </BodyShort>

      <BodyShort>
        Du kan også ta kontakt med NAV på telefon 55 55 33 33 for å få informasjon om hvilken økonomisk støtte som kan
        være aktuell for deg hvis du får et inntektstap.
      </BodyShort>
    </>
  )
}

export function TilbakeGradertAccordionItem(): ReactElement {
  return (
    <Accordion.Item>
      <Accordion.Header>Hvis du skal jobbe redusert</Accordion.Header>
      <Accordion.Content>
        <VStack gap="6">
          <TilbakeGradertContent />
        </VStack>
      </Accordion.Content>
    </Accordion.Item>
  )
}

function TilbakeGradertReceipt(): ReactElement {
  return (
    <>
      <Heading size="medium" level="2">
        Når du skal jobbe i redusert stillingsprosent
      </Heading>
      <TilbakeGradertContent />
      <Accordion>
        <TilbakeMedTilpasningerAccordionItem />
        <BytteJobbAccordionItem />
        <FortsattSykAccordionItem />
      </Accordion>
    </>
  )
}

export default TilbakeGradertReceipt
