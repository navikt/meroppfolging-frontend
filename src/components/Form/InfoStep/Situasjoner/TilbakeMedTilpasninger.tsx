import React, { ReactElement } from 'react'
import { BodyShort } from '@navikt/ds-react'

export const TilbakeMedTilpasninger = (): ReactElement => {
  return (
    <>
      <BodyShort>
        Arbeidsgiveren din skal, så langt det er mulig, tilpasse arbeidsplassen og oppgavene dine slik at du kan jobbe.
      </BodyShort>
      <BodyShort>Det er ditt ansvar å bidra til å finne løsninger slik at du kan jobbe.</BodyShort>
      <BodyShort>
        <b>Snakk med lederen din om hvilke muligheter som finnes.</b>
      </BodyShort>
    </>
  )
}
