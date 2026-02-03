import React, { ReactElement } from 'react'
import { Alert } from '@navikt/ds-react'

export const TakkForTilbakemeldingen = (): ReactElement => {
  return (
    <div aria-live="polite">
      <Alert variant="success" className="mt-2">
        Takk for tilbakemeldingen din!
      </Alert>
    </div>
  )
}
