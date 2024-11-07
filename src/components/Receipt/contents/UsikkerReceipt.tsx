import { ReactElement } from 'react'
import { Accordion, Heading } from '@navikt/ds-react'

import { FortsattSykContent } from '@/components/Receipt/contents/FortsattSykReceipt'
import { TilbakeMedTilpasningerAccordionItem } from '@/components/Receipt/contents/TilbakeMedTilpasningerReceipt'
import { TilbakeGradertAccordionItem } from '@/components/Receipt/contents/TilbakeGradertReceipt'
import { BytteJobbAccordionItem } from '@/components/Receipt/contents/BytteJobbReceipt'

function UsikkerReceipt(): ReactElement {
  return (
    <>
      <Heading size="medium" level="2">
        Hvis du fortsatt er for syk til å jobbe
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

export default UsikkerReceipt
