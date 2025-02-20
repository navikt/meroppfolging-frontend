import { ReactElement } from 'react'
import { VStack } from '@navikt/ds-react'
import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'
import MaxDateInfo from '@/components/LandingInfo/MaxDateInfo'

import ThankYouAlert from './contents/ThankYouAlert'
import OppsummeringAvDineSvar from './contents/OppsummeringAvDineSvar'
import HvaSkjerVidereTekst from './contents/HvaSkjerVidereTekst'
import NyttigeLenker from './contents/NyttigeLenker'
import KontaktInformasjon from './contents/KontaktInformasjon'
import { MaxDateDTO } from '@/server/schemas/sykepengedagerInformasjonSchema'

interface Props {
  fremtidigSituasjonAnswer: FremtidigSituasjonAnswerTypes
  behovForOppfolgingAnswer: BehovForOppfolgingAnswerTypes
  responseDateISOString: string | null
  maxDate: MaxDateDTO
}

function Receipt({
  fremtidigSituasjonAnswer,
  behovForOppfolgingAnswer,
  responseDateISOString,
  maxDate,
}: Props): ReactElement {
  return (
    <VStack gap="6">
      <ThankYouAlert responseDateISOString={responseDateISOString} />

      <OppsummeringAvDineSvar
        fremtidigSituasjonAnswer={fremtidigSituasjonAnswer}
        behovForOppfolgingAnswer={behovForOppfolgingAnswer}
      />

      <HvaSkjerVidereTekst behovForOppfolgingAnswer={behovForOppfolgingAnswer} />

      <MaxDateInfo maxDate={maxDate} />

      <NyttigeLenker />

      <KontaktInformasjon />

      {/*<Flexjar
        feedbackId={`meroppfolging-kvittering-${fremtidigSituasjonAnswer}`}
        sporsmal="Synes du at du har fått nok informasjon om hva som skjer etter at sykepengene tar slutt?"
      />*/}
    </VStack>
  )
}

export default Receipt
