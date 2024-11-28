import React, { ReactElement } from 'react'
import { BodyShort } from '@navikt/ds-react'

import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

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
        <TrackedExternalLink href="https://www.nav.no/tilrettelegging-jobb">
          tilrettelegging på jobb
        </TrackedExternalLink>{' '}
        og hva Nav kan bistå med.
      </BodyShort>
    </>
  )
}
