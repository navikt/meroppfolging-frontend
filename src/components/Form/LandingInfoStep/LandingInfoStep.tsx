import React, { ReactElement, useEffect } from 'react'
import { BodyLong } from '@navikt/ds-react'

import { Step } from '../Step'

import MaxDateInfo from './MaxDateInfo'

function LandingInfoStep(): ReactElement {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Step heading="Sykepengene dine tar snart slutt" customNextButtonLabel="Gå videre">
      <MaxDateInfo />

      <BodyLong>
        Det er viktig at du tar stilling til din økonomiske situasjon i god tid før sykepengene tar slutt.
      </BodyLong>

      <BodyLong>
        Vi ber deg svare på noen spørsmål, slik at vi best mulig kan gi deg informasjon som er relevant for deg, og
        hjelpe deg hvis du har behov for det.
      </BodyLong>
    </Step>
  )
}

export default LandingInfoStep
