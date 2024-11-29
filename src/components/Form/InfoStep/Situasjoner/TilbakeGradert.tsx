import React, { ReactElement } from 'react'
import { BodyShort, Link } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import AlleredeSoktOmPengestotteExpansionCard from '@/components/UI/AlleredeSoktOmPengestotteExpansionCard'

export const TilbakeGradert = (): ReactElement => {
  return (
    <>
      <BodyShort>
        Hvis du skal jobbe redusert fordi du har en sykdom eller skade, kan det hende at du har rett på{' '}
        <Link href="https://www.nav.no/aap" target="_blank" rel="noopener noreferrer">
          arbeidsavklaringspenger (AAP) <ExternalLinkIcon title="åpner i ny fane" />
        </Link>
        , eller en annen økonomisk støtte.
      </BodyShort>

      <BodyShort>
        Les mer om{' '}
        <Link href="https://www.nav.no/jobbe-noe#pengestotte" target="_blank" rel="noopener noreferrer">
          aktuelle pengestøtter <ExternalLinkIcon title="åpner i ny fane" />
        </Link>{' '}
        når du skal jobbe redusert.
      </BodyShort>

      <AlleredeSoktOmPengestotteExpansionCard />

      <BodyShort>
        <Link href="https://www.nav.no/midlertidig-lonnstilskudd" target="_blank" rel="noopener noreferrer">
          Midlertidig lønnstilskudd <ExternalLinkIcon title="åpner i ny fane" />
        </Link>{' '}
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
