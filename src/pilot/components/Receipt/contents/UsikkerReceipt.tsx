import { ReactElement } from 'react'
import { Accordion, Heading } from '@navikt/ds-react'

import { FortsattSykContent } from '@/pilot/components/Receipt/contents/FortsattSykReceipt'
import { TilbakeMedTilpasningerAccordianItem } from '@/pilot/components/Receipt/contents/TilbakeMedTilpasningerReceipt'
import { TilbakeGradertAccordianItem } from '@/pilot/components/Receipt/contents/TilbakeGradertReceipt'
import { BytteJobbAccordianItem } from '@/pilot/components/Receipt/contents/BytteJobbReceipt'

function UsikkerReceipt(): ReactElement {
  return (
    <>
      <Heading size="medium" level="2">
        Hvis du fortsatt er for syk til å jobbe
      </Heading>
      <FortsattSykContent />
      <Accordion>
        <TilbakeMedTilpasningerAccordianItem />
        <TilbakeGradertAccordianItem />
        <BytteJobbAccordianItem />
      </Accordion>
    </>
  )
}

export default UsikkerReceipt
