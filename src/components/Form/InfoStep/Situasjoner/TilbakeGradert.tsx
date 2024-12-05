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

      <AlleredeSoktOmPengestotteExpansionCard />
    </>
  )
}
