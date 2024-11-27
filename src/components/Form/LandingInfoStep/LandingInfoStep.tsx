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
        Vi ber deg svare på noen få spørsmål, slik at vi best mulig kan gi deg informasjon om hvilke muligheter du har,
        og hjelpe deg videre.
      </BodyLong>
    </Step>
  )
}

export default LandingInfoStep
