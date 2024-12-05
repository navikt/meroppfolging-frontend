import React, { ReactElement } from 'react'

import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

export const InformasjonOmTilpasninger = (): ReactElement => {
  return (
    <TrackedExternalLink href="https://www.nav.no/tilrettelegging-jobb">
      Les mer om tilrettelegging på jobb, og hva Nav kan bistå med
    </TrackedExternalLink>
  )
}
