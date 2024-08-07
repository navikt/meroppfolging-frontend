import { ReactElement } from 'react'
import { Accordion, BodyShort, Heading, Link, VStack } from '@navikt/ds-react'

import { TilbakeMedTilpasningerAccordianItem } from '@/pilot/components/Receipt/contents/TilbakeMedTilpasningerReceipt'
import { BytteJobbAccordianItem } from '@/pilot/components/Receipt/contents/BytteJobbReceipt'
import { FortsattSykAccordianItem } from '@/pilot/components/Receipt/contents/FortsattSykReceipt'

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
    </>
  )
}

export function TilbakeGradertAccordianItem(): ReactElement {
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
        <TilbakeMedTilpasningerAccordianItem />
        <BytteJobbAccordianItem />
        <FortsattSykAccordianItem />
      </Accordion>
    </>
  )
}

export default TilbakeGradertReceipt
