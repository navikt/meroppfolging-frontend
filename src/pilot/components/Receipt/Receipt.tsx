import { ReactElement } from 'react'

import UsefulLinks from '@/pilot/components/Receipt/UsefulLinks'
import TilbakeGradertReceipt from '@/pilot/components/Receipt/contents/TilbakeGradertReceipt'
import { Flexjar } from '@/components/Flexjar/flexjar'
import { Form } from '@/pilot/server/services/schemas/formRequestSchema'
import ReceiptIngress from '@/pilot/components/Receipt/ReceiptIngress'
import FortsattSykReceipt from '@/pilot/components/Receipt/contents/FortsattSykReceipt'
import BytteJobbReceipt from '@/pilot/components/Receipt/contents/BytteJobbReceipt'
import TilbakeMedTilpasningerReceipt from '@/pilot/components/Receipt/contents/TilbakeMedTilpasningerReceipt'
import UsikkerReceipt from '@/pilot/components/Receipt/contents/UsikkerReceipt'
import TilbakeHosArbeidsgiverReceipt from '@/pilot/components/Receipt/contents/TilbakeHosArbeidsgiverReceipt'

function Content({ formResponse }: { formResponse: Form }): ReactElement {
  const fremtidigSituasjonAnswer = formResponse[0].answerType

  switch (fremtidigSituasjonAnswer) {
    case 'BYTTE_JOBB':
      return <BytteJobbReceipt />
    case 'FORTSATT_SYK':
      return <FortsattSykReceipt />
    case 'TILBAKE_GRADERT':
      return <TilbakeGradertReceipt />
    case 'TILBAKE_HOS_ARBEIDSGIVER':
      return <TilbakeHosArbeidsgiverReceipt />
    case 'TILBAKE_MED_TILPASNINGER':
      return <TilbakeMedTilpasningerReceipt />
    case 'USIKKER':
      return <UsikkerReceipt />
    default:
      const exhaustiveCheck: never = fremtidigSituasjonAnswer
      return exhaustiveCheck
  }
}

function Receipt({ response }: { response: Form }): ReactElement {
  return (
    <>
      <ReceiptIngress formResponse={response} />
      <Content formResponse={response} />
      <UsefulLinks />
      <Flexjar
        feedbackId="meroppfolging-kvittering"
        sporsmal="Føler du at denne siden har gitt deg nok informasjon om hva som skjer etter at sykepengene tar slutt?"
      />
    </>
  )
}

export default Receipt
