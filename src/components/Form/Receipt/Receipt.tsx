import { ReactElement } from 'react'
import { VStack } from '@navikt/ds-react'

import { Flexjar } from '@/components/Flexjar/flexjar'
import { Form } from '@/server/services/schemas/formRequestSchema'

import BytteJobbReceipt from './contents/BytteJobbReceipt'
import FortsattSykReceipt from './contents/FortsattSykReceipt'
import TilbakeGradertReceipt from './contents/TilbakeGradertReceipt'
import TilbakeHosArbeidsgiverReceipt from './contents/TilbakeHosArbeidsgiverReceipt'
import TilbakeMedTilpasningerReceipt from './contents/TilbakeMedTilpasningerReceipt'
import UsikkerReceipt from './contents/UsikkerReceipt'
import ReceiptIngress from './ReceiptIngress'
import SituationChange from './SituationChange'
import UsefulLinks from './UsefulLinks'

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
    <VStack gap="6">
      <ReceiptIngress behovForOppfolgingAnswer={behovForOppfolgingAnswer} />
      <Content fremtidigSituasjonAnswer={fremtidigSituasjonAnswer} />
      <SituationChange behovForOppfolgingAnswer={behovForOppfolgingAnswer} />
      <UsefulLinks />
      <Flexjar
        feedbackId={`meroppfolging-kvittering-${fremtidigSituasjonAnswer}`}
        sporsmal="Føler du at denne siden har gitt deg nok informasjon om hva som skjer etter at sykepengene tar slutt?"
      />
    </VStack>
  )
}

export default Receipt
