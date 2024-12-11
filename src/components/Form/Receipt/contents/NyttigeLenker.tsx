import { ReactElement } from 'react'
import { BodyLong, Box, Heading } from '@navikt/ds-react'

import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

const NyttigeLenker = (): ReactElement => (
  <Box>
    <Heading size="medium" spacing>
      Lenker som kan være nyttige for deg
    </Heading>

    <BodyLong>
      <TrackedExternalLink href="https://www.nav.no/syk-lenge" openingInNewTabIconInsteadOfText>
        Har vært syk eller skadet lenge
      </TrackedExternalLink>
    </BodyLong>

    <BodyLong className="mt-2">
      <TrackedExternalLink href="https://www.nav.no/aap" openingInNewTabIconInsteadOfText>
        Arbeidsavklaringspenger (AAP)
      </TrackedExternalLink>
    </BodyLong>

    <BodyLong className="mt-2">
      <TrackedExternalLink
        href="https://www.nav.no/arbeidsgiver/kompetansetiltak-sykmeldte"
        openingInNewTabIconInsteadOfText
      >
        Kompetansetiltak for sykmeldte
      </TrackedExternalLink>
    </BodyLong>

    <BodyLong className="mt-2">
      <TrackedExternalLink href="https://www.nav.no/friskmelding-arbeidsformidling" openingInNewTabIconInsteadOfText>
        Friskmelding til arbeidsformidling
      </TrackedExternalLink>
    </BodyLong>

    <BodyLong className="mt-2">
      <TrackedExternalLink href="https://www.nav.no/varig-sykdom-skade#pengestotte" openingInNewTabIconInsteadOfText>
        Aktuelle pengestøtter
      </TrackedExternalLink>
    </BodyLong>
  </Box>
)

export default NyttigeLenker
