import React, { ReactElement, useEffect } from 'react'
import { BodyLong, BodyShort } from '@navikt/ds-react'

import { Step } from '../Step'

import MaxDateInfo from './MaxDateInfo'

interface Props {
  nextStep: () => void
}

function LandingInfoStep({ nextStep }: Props): ReactElement {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Step heading="Sykepengene dine tar snart slutt" nextStep={nextStep}>
      <MaxDateInfo />

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
