import { ReactElement } from 'react'
import { Accordion, BodyShort, Heading, VStack } from '@navikt/ds-react'

import { TilbakeMedTilpasningerAccordionItem } from '@/components/Form/Receipt/contents/TilbakeMedTilpasningerReceipt'
import { BytteJobbAccordionItem } from '@/components/Form/Receipt/contents/BytteJobbReceipt'
import { FortsattSykAccordionItem } from '@/components/Form/Receipt/contents/FortsattSykReceipt'
import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

function TilbakeGradertContent(): ReactElement {
  return (
    <>
      <BodyShort>
        Hvis du skal jobbe redusert fordi du har en sykdom eller skade, kan det hende at du har rett på{' '}
        <TrackedExternalLink href="https://www.nav.no/aap">arbeidsavklaringspenger (AAP)</TrackedExternalLink>, eller en
        annen økonomisk støtte.
      </BodyShort>

      <BodyShort>
        Les mer om{' '}
        <TrackedExternalLink href=" https://www.nav.no/jobbe-noe#pengestotte">
          aktuelle pengestøtter
        </TrackedExternalLink>
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
