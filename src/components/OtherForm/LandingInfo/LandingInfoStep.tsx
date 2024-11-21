import React, { ReactElement } from 'react'
import { BodyLong, BodyShort } from '@navikt/ds-react'

import OtherMaxDateInfo from '@/components/OtherForm/LandingInfo/OtherMaxDateInfo'
import { Step } from '@/components/OtherForm/Step'

interface Props {
  nextStep: () => void
}

function LandingInfoStep({ nextStep }: Props): ReactElement {
  return (
    <Step heading="Sykepengene dine tar snart slutt" nextStep={nextStep}>
      <OtherMaxDateInfo />

      <BodyLong>
        Det er viktig at du tar stilling til din økonomiske situasjon i god tid før sykepengene tar slutt.
      </BodyLong>

      <BodyShort>
        Vi ber deg svare på noen få spørsmål, slik at vi best mulig kan gi deg informasjon om hvilke muligheter du har.
      </BodyShort>
    </Step>
  )
}

export default LandingInfoStep
