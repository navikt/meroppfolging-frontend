import { Accordion } from '@navikt/ds-react'
import { ReactElement } from 'react'

import { TilbakeMedTilpasningerAccordionItem } from './TilbakeMedTilpasningerReceipt'
import { TilbakeGradertAccordionItem } from './TilbakeGradertReceipt'
import { BytteJobbAccordionItem } from './BytteJobbReceipt'
import { FortsattSykAccordionItem } from './FortsattSykReceipt'

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
