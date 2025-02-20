'use client'

import { ReactElement } from 'react'
import { VStack } from '@navikt/ds-react'

import { Form } from '@/server/schemas/formRequestSchema'
import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'
import MaxDateInfo from '@/components/LandingInfo/MaxDateInfo'

import ThankYouAlert from './contents/ThankYouAlert'
import OppsummeringAvDineSvar from './contents/OppsummeringAvDineSvar'
import HvaSkjerVidereTekst from './contents/HvaSkjerVidereTekst'
import NyttigeLenker from './contents/NyttigeLenker'
import KontaktInformasjon from './contents/KontaktInformasjon'
import { MaxDateDTO } from '@/server/schemas/sykepengedagerInformasjonSchema'

interface Props {
  response: Form
  responseDateISOString: string | null
  maxDate: MaxDateDTO
}

function Receipt({ response, responseDateISOString, maxDate }: Props): ReactElement {
  const fremtidigSituasjonAnswer: FremtidigSituasjonAnswerTypes = response[0].answerType
  const behovForOppfolgingAnswer: BehovForOppfolgingAnswerTypes = response[1].answerType

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
