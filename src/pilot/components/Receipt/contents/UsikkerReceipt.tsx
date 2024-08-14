import { ReactElement } from 'react'
import { Accordion, Heading } from '@navikt/ds-react'

import { FortsattSykContent } from '@/pilot/components/Receipt/contents/FortsattSykReceipt'
import { TilbakeMedTilpasningerAccordionItem } from '@/pilot/components/Receipt/contents/TilbakeMedTilpasningerReceipt'
import { TilbakeGradertAccordionItem } from '@/pilot/components/Receipt/contents/TilbakeGradertReceipt'
import { BytteJobbAccordionItem } from '@/pilot/components/Receipt/contents/BytteJobbReceipt'

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
