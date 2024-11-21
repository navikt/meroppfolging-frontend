import { ReactElement } from 'react'
import { Accordion, BodyShort, Heading, Link, VStack } from '@navikt/ds-react'

import { TilbakeMedTilpasningerAccordionItem } from '@/components/Form/Receipt/contents/TilbakeMedTilpasningerReceipt'
import { BytteJobbAccordionItem } from '@/components/Form/Receipt/contents/BytteJobbReceipt'
import { FortsattSykAccordionItem } from '@/components/Form/Receipt/contents/FortsattSykReceipt'

function TilbakeGradertContent(): ReactElement {
  return (
    <>
      <BodyShort>
        Hvis du skal jobbe redusert fordi du har en sykdom eller skade, kan det hende at du har rett på{' '}
        <Link href="https://www.nav.no/aap" target="_blank" rel="noopener noreferrer">
          arbeidsavklaringspenger (AAP)
        </Link>
        , eller en annen økonomisk støtte.
      </BodyShort>

      <BodyShort>
        Les mer om{' '}
        <Link href=" https://www.nav.no/jobbe-noe#pengestotte" target="_blank" rel="noopener noreferrer">
          aktuelle pengestøtter
        </Link>
        .
      </BodyShort>

      <BodyShort>
        Du kan også ta kontakt med Nav på telefon 55 55 33 33 for å få informasjon om hvilken økonomisk støtte som kan
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
