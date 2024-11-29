import React, { ReactElement } from 'react'
import { BodyLong } from '@navikt/ds-react'

export const TilbakeHosArbeidsgiver = (): ReactElement => {
  return (
    <>
      <BodyLong>
        Hvis situasjonen din skulle endre seg og du får behov for tilrettelegging på arbeidsplassen, så skal
        arbeidsgiveren din, så langt det er mulig, tilpasse arbeidsplassen og oppgavene dine slik at du kan jobbe.
      </BodyLong>
      <BodyLong>
        Husk at du alltid kan kontakte Nav dersom du trenger hjelp med noe eller hvis situasjonen din endrer seg.
      </BodyLong>
    </>
  )
}
