import React, { ReactElement } from 'react'
import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react'

import AlleredeSoktOmPengestotteExpansionCard from '@/components/UI/AlleredeSoktOmPengestotteExpansionCard'
import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

export const FortsattSyk = (): ReactElement => {
  return (
    <>
      <BodyShort>
        Hvis du ikke er frisk nok til å gå tilbake til jobb slik som før, kan det være riktig å søke om{' '}
        <TrackedExternalLink href="https://www.nav.no/aap">arbeidsavklaringspenger</TrackedExternalLink>, eller en annen
        økonomisk støtte.
      </BodyShort>
      <BodyShort>
        <b>Du må selv søke om AAP eller annen økonomisk støtte.</b> Dette skjer ikke automatisk.
      </BodyShort>
      <BodyShort>
        Du må være forberedt på å gå ned i inntekt når sykepengene tar slutt. Dette er fordi våre andre støtteordninger
        ikke gir like mye utbetalt som sykepenger. Husk at du også kan ha rettigheter hos forsikringsselskapet eller
        pensjonskassen din.
      </BodyShort>
      <Alert variant="info">
        <Heading size="xsmall" level="3" spacing>
          Husk å søke tidlig nok!
        </Heading>
        <BodyLong className="mb-2">
          Saksbehandlingstiden for AAP-søknader er <b>omtrent 15 uker.</b>
        </BodyLong>
      </Alert>
      <AlleredeSoktOmPengestotteExpansionCard />
    </>
  )
}