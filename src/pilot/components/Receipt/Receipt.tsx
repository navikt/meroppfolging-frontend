import { ReactElement } from 'react'

import UsefulLinks from '@/pilot/components/Receipt/UsefulLinks'
import TilbakeGradertReceipt from '@/pilot/components/Receipt/contents/TilbakeGradertReceipt'
import { Flexjar } from '@/components/Flexjar/flexjar'
import { Form } from '@/pilot/server/services/schemas/formRequestSchema'
import ReceiptIngress from '@/pilot/components/Receipt/ReceiptIngress'

function Content({ formResponse }: { formResponse: Form }): ReactElement {
  const fremtidigSituasjonAnswer = formResponse[0].answerType

  switch (fremtidigSituasjonAnswer) {
    case 'BYTTE_JOBB':
      return <>1</>
    case 'FORTSATT_SYK':
      return <>2</>
    case 'TILBAKE_GRADERT':
      return <>3</>
    case 'TILBAKE_HOS_ARBEIDSGIVER':
      return <TilbakeGradertReceipt />
    case 'TILBAKE_MED_TILPASNINGER':
      return <>5</>
    case 'USIKKER':
      return <>lol</>
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
