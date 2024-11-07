import { Accordion } from '@navikt/ds-react'
import { ReactElement } from 'react'

import { BytteJobbAccordionItem } from '@/components/Receipt/contents/BytteJobbReceipt'
import { TilbakeGradertAccordionItem } from '@/components/Receipt/contents/TilbakeGradertReceipt'
import { FortsattSykAccordionItem } from '@//components/Receipt/contents/FortsattSykReceipt'
import { TilbakeMedTilpasningerAccordionItem } from '@/components/Receipt/contents/TilbakeMedTilpasningerReceipt'

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
