import { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

import SenOppfolgingForm from '@/pilot/components/SenOppfolging/SenOppfolgingForm'
import MaxDateIngress from '@/components/SnartSluttPaSykepengene/MaxDateIngress'

function SenOppfolging(): ReactElement {
  return (
    <>
      <Heading size="large" level="1">
        Trenger du hjelp fra oss?
      </Heading>

      <MaxDateIngress />

      <BodyShort>
        Vi trenger å vite om du trenger hjelp fra oss{' '}
        <b>for å sikre at du har en inntekt etter at sykepengene tar slutt.</b>
      </BodyShort>
      <BodyShort>
        Vi kan kartlegge mulighetene dine fremover og vi kan hjelpe deg å finne ut om du kan få en annen økonomisk
        støtte.
      </BodyShort>

      <SenOppfolgingForm />
    </>
  )
}

export default SenOppfolging
