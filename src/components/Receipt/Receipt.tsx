import { ReactElement } from 'react'

import UsefulLinks from '@/components/Receipt/UsefulLinks'
import TilbakeGradertReceipt from '@/components/Receipt/contents/TilbakeGradertReceipt'
import { Flexjar } from '@/components/Flexjar/flexjar'
import { Form } from '@/server/services/schemas/formRequestSchema'
import ReceiptIngress from '@/components/Receipt/ReceiptIngress'
import FortsattSykReceipt from '@/components/Receipt/contents/FortsattSykReceipt'
import BytteJobbReceipt from '@/components/Receipt/contents/BytteJobbReceipt'
import TilbakeMedTilpasningerReceipt from '@/components/Receipt/contents/TilbakeMedTilpasningerReceipt'
import UsikkerReceipt from '@/components/Receipt/contents/UsikkerReceipt'
import TilbakeHosArbeidsgiverReceipt from '@/components/Receipt/contents/TilbakeHosArbeidsgiverReceipt'
import SituationChange from '@/components/Receipt/SituationChange'

function Content({
  fremtidigSituasjonAnswer,
}: {
  fremtidigSituasjonAnswer:
    | 'BYTTE_JOBB'
    | 'FORTSATT_SYK'
    | 'TILBAKE_GRADERT'
    | 'TILBAKE_HOS_ARBEIDSGIVER'
    | 'TILBAKE_MED_TILPASNINGER'
    | 'USIKKER'
}): ReactElement {
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
  const fremtidigSituasjonAnswer = response[0].answerType
  const behovForOppfolgingAnswer = response[1].answerType

  return (
    <>
      <ReceiptIngress behovForOppfolgingAnswer={behovForOppfolgingAnswer} />
      <Content fremtidigSituasjonAnswer={fremtidigSituasjonAnswer} />
      <SituationChange behovForOppfolgingAnswer={behovForOppfolgingAnswer} />
      <UsefulLinks />
      <Flexjar
        feedbackId={`meroppfolging-kvittering-${fremtidigSituasjonAnswer}`}
        sporsmal="Føler du at denne siden har gitt deg nok informasjon om hva som skjer etter at sykepengene tar slutt?"
      />
    </>
  )
}

export default Receipt
