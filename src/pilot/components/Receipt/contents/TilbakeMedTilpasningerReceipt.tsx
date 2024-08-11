import { ReactElement } from 'react'
import { Accordion, BodyShort, Heading, VStack } from '@navikt/ds-react'

import { TilbakeGradertAccordionItem } from '@/pilot/components/Receipt/contents/TilbakeGradertReceipt'
import { BytteJobbAccordionItem } from '@/pilot/components/Receipt/contents/BytteJobbReceipt'
import { FortsattSykAccordionItem } from '@/pilot/components/Receipt/contents/FortsattSykReceipt'

function TilbakeMedTilpasningerContent(): ReactElement {
  return (
    <>
      <BodyShort>
        Arbeidsgiveren din skal, så langt det er mulig, tilpasse arbeidsplassen og oppgavene dine slik at du kan jobbe.
      </BodyShort>
      <BodyShort>Det er ditt ansvar å bidra til å finne løsninger slik at du kan jobbe.</BodyShort>
      <BodyShort>
        <b>Snakk med lederen din om hvilke muligheter som finnes.</b>
      </BodyShort>
    </>
  )
}

export function TilbakeMedTilpasningerAccordionItem(): ReactElement {
  return (
    <Accordion.Item>
      <Accordion.Header>Hvis du trenger tilrettelegging for å stå i jobben du har</Accordion.Header>
      <Accordion.Content>
        <VStack gap="6">
          <TilbakeMedTilpasningerContent />
        </VStack>
      </Accordion.Content>
    </Accordion.Item>
  )
}

function TilbakeMedTilpasningerReceipt(): ReactElement {
  return (
    <>
      <Heading size="medium" level="2">
        Når du trenger tilrettelegging på arbeidsplassen
      </Heading>
      <TilbakeMedTilpasningerContent />
      <Accordion>
        <TilbakeGradertAccordionItem />
        <BytteJobbAccordionItem />
        <FortsattSykAccordionItem />
      </Accordion>
    </>
  )
}

export default TilbakeMedTilpasningerReceipt
