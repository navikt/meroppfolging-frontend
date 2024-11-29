import React, { ReactElement } from 'react'
import { BodyShort, Link } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

export const TilbakeMedTilpasninger = (): ReactElement => {
  return (
    <>
      <BodyShort>
        Arbeidsgiveren din skal, så langt det er mulig, tilpasse arbeidsplassen og oppgavene dine slik at du kan jobbe.
      </BodyShort>
      <BodyShort>
        <b>Snakk med lederen din om hvilke muligheter som finnes.</b>
      </BodyShort>
      <BodyShort>
        Les mer om{' '}
        <Link href="https://www.nav.no/tilrettelegging-jobb" target="_blank">
          tilrettelegging på jobb <ExternalLinkIcon title="åpner i ny fane" />
        </Link>{' '}
        (åpner i ny fane) og hva Nav kan bistå med.
      </BodyShort>
    </>
  )
}
