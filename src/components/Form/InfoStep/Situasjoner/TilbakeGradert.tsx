import React, { ReactElement } from 'react'
import { BodyShort, Link } from '@navikt/ds-react'

export const TilbakeGradert = (): ReactElement => {
  return (
    <>
      <BodyShort>
        Hvis du skal jobbe redusert fordi du har en sykdom eller skade, kan det hende at du har rett på{' '}
        <Link href="https://www.nav.no/aap" target="_blank" rel="noopener noreferrer">
          arbeidsavklaringspenger (AAP)
        </Link>
        , eller en annen økonomisk støtte.
      </BodyShort>

      <BodyShort>
        Les mer om{' '}
        <Link href=" https://www.nav.no/jobbe-noe#pengestotte" target="_blank" rel="noopener noreferrer">
          aktuelle pengestøtter
        </Link>
        .
      </BodyShort>

      <BodyShort>
        Du kan også ta kontakt med Nav på telefon 55 55 33 33 for å få informasjon om hvilken økonomisk støtte som kan
        være aktuell for deg hvis du får et inntektstap.
      </BodyShort>
    </>
  )
}
