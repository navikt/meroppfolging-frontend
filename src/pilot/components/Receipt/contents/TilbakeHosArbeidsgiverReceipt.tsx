import { Accordion } from '@navikt/ds-react'
import { ReactElement } from 'react'

import { BytteJobbAccordianItem } from '@/pilot/components/Receipt/contents/BytteJobbReceipt'
import { TilbakeGradertAccordianItem } from '@/pilot/components/Receipt/contents/TilbakeGradertReceipt'
import { FortsattSykAccordianItem } from '@/pilot/components/Receipt/contents/FortsattSykReceipt'
import { TilbakeMedTilpasningerAccordianItem } from '@/pilot/components/Receipt/contents/TilbakeMedTilpasningerReceipt'

function TilbakeHosArbeidsgiverReceipt(): ReactElement {
  return (
    <>
      <Accordion>
        <TilbakeMedTilpasningerAccordianItem />
        <TilbakeGradertAccordianItem />
        <BytteJobbAccordianItem />
        <FortsattSykAccordianItem />
      </Accordion>
    </>
  )
}

export default TilbakeHosArbeidsgiverReceipt
