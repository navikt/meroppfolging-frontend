import { Accordion } from '@navikt/ds-react'
import { ReactElement } from 'react'

import { BytteJobbAccordionItem } from '@/pilot/components/Receipt/contents/BytteJobbReceipt'
import { TilbakeGradertAccordionItem } from '@/pilot/components/Receipt/contents/TilbakeGradertReceipt'
import { FortsattSykAccordionItem } from '@/pilot/components/Receipt/contents/FortsattSykReceipt'
import { TilbakeMedTilpasningerAccordionItem } from '@/pilot/components/Receipt/contents/TilbakeMedTilpasningerReceipt'

function TilbakeHosArbeidsgiverReceipt(): ReactElement {
  return (
    <>
      <Accordion>
        <TilbakeMedTilpasningerAccordionItem />
        <TilbakeGradertAccordionItem />
        <BytteJobbAccordionItem />
        <FortsattSykAccordionItem />
      </Accordion>
    </>
  )
}

export default TilbakeHosArbeidsgiverReceipt
