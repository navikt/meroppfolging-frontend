import React, { ReactElement } from 'react'
import { BodyShort } from '@navikt/ds-react'

import AlleredeSoktOmPengestotteExpansionCard from '@/components/UI/AlleredeSoktOmPengestotteExpansionCard'
import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

export const TilbakeGradert = (): ReactElement => {
  return (
    <>
      <BodyShort>
        Hvis du skal jobbe redusert fordi du har en sykdom eller skade, kan det hende at du har rett på{' '}
        <TrackedExternalLink href="https://www.nav.no/aap">arbeidsavklaringspenger (AAP)</TrackedExternalLink>, eller en
        annen økonomisk støtte.
      </BodyShort>

      <BodyShort>
        Les mer om{' '}
        <TrackedExternalLink href="https://www.nav.no/jobbe-noe#pengestotte">aktuelle pengestøtter</TrackedExternalLink>{' '}
        når du skal jobbe redusert.
      </BodyShort>

      <AlleredeSoktOmPengestotteExpansionCard />

      <BodyShort>
        <TrackedExternalLink href="https://www.nav.no/midlertidig-lonnstilskudd">
          Midlertidig lønnstilskudd
        </TrackedExternalLink>{' '}
        er et tilskudd til arbeidsgiveren din som kan være aktuelt hvis du står i fare for å miste jobben etter å ha
        vært sykmeldt i 12 måneder.
      </BodyShort>

      <BodyShort>
        Du kan også ta kontakt med Nav på telefon 55&nbsp;55&nbsp;33&nbsp;33 for å få informasjon om hvilken økonomisk
        støtte som kan være aktuell for deg hvis du får et inntektstap.
      </BodyShort>
    </>
  )
}
