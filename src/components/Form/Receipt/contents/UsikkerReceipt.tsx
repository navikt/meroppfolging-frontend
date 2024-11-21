import { ReactElement } from 'react'
import { Accordion, Heading } from '@navikt/ds-react'

import { TilbakeMedTilpasningerAccordionItem } from './TilbakeMedTilpasningerReceipt'
import { FortsattSykContent } from './FortsattSykReceipt'
import { TilbakeGradertAccordionItem } from './TilbakeGradertReceipt'
import { BytteJobbAccordionItem } from './BytteJobbReceipt'

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
