import { ReactElement } from 'react'
import { Box, Heading } from '@navikt/ds-react'

import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

function UsefulLinks(): ReactElement {
  return (
    <Box>
      <Heading size="medium" level="2" spacing>
        Nyttige lenker
      </Heading>
      <ul>
        <li>
          <TrackedExternalLink href="https://www.nav.no/syk-lenge">Har vært syk eller skadet lenge</TrackedExternalLink>
        </li>
        <li className="mt-2">
          <TrackedExternalLink href="https://www.nav.no/aap">Arbeidsavklaringspenger (AAP)</TrackedExternalLink>
        </li>
        <li className="mt-2">
          <TrackedExternalLink href="https://www.nav.no/arbeidsgiver/kompetansetiltak-sykmeldte">
            Kompetansetiltak for sykmeldte
          </TrackedExternalLink>
        </li>
        <li className="mt-2">
          <TrackedExternalLink href="https://www.nav.no/friskmelding-arbeidsformidling">
            Friskmelding til arbeidsformidling
          </TrackedExternalLink>
        </li>
      </ul>
    </Box>
  )
}

export default UsefulLinks
