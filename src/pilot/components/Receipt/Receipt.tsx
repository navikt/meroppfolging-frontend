import { ReactElement } from 'react'
import { Button, RadioGroup } from '@navikt/ds-react'

import UsefulLinks from '@/pilot/components/Receipt/UsefulLinks'
import TilbakeGradertReceipt from '@/pilot/components/Receipt/contents/TilbakeGradertReceipt'
import { Flexjar } from '@/components/Flexjar/flexjar'
import FortsattSykReceipt from '@/pilot/components/Receipt/contents/FortsattSykReceipt'
import BytteJobbReceipt from '@/pilot/components/Receipt/contents/BytteJobbReceipt'
import TilbakeMedTilpasningerReceipt from '@/pilot/components/Receipt/contents/TilbakeMedTilpasningerReceipt'
import UsikkerReceipt from '@/pilot/components/Receipt/contents/UsikkerReceipt'
import TilbakeHosArbeidsgiverReceipt from '@/pilot/components/Receipt/contents/TilbakeHosArbeidsgiverReceipt'
import { FremtidigSituasjonAnswerTypes } from '@/pilot/domain/answerValues'
import { QUESTION_TEXTS } from '@/pilot/domain/formValues'
import { RadioAlternatives } from '@/pilot/components/LandingPage/LandingPilot'

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

function Receipt({ next }: { next: FremtidigSituasjonAnswerTypes }): ReactElement {
  return (
    <>
      <Content fremtidigSituasjonAnswer={next} />

      <RadioGroup
        legend={QUESTION_TEXTS['BEHOV_FOR_OPPFOLGING']}
        description="En veileder kan hjelpe deg på veien videre. Sammen kan dere kartlegge mulighetene dine, og vurdere hvilken hjelp og støtte du kan få fra NAV."
      >
        {RadioAlternatives('BEHOV_FOR_OPPFOLGING')}
      </RadioGroup>

      <Button className="w-fit">Send svarene</Button>

      <UsefulLinks />
      <Flexjar
        feedbackId={`meroppfolging-kvittering-${next}`}
        sporsmal="Føler du at denne siden har gitt deg nok informasjon om hva som skjer etter at sykepengene tar slutt?"
      />
    </>
  )
}

export default Receipt
