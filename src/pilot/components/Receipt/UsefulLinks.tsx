import { ReactElement } from 'react'
import { Box, Heading, Link } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

function UsefulLinks(): ReactElement {
  return (
    <Box>
      <Heading size="medium" level="2" spacing>
        Nyttige lenker
      </Heading>
      <ul>
        <li>
          <Link href="https://www.nav.no/syk-lenge">
            Har vært syk eller skadet lenge <ExternalLinkIcon title="external link" />
          </Link>
        </li>
        <li className="mt-2">
          <Link href="https://www.nav.no/aap">
            Arbeidsavklaringspenger (AAP) <ExternalLinkIcon title="external link" />
          </Link>
        </li>
        <li className="mt-2">
          <Link href="https://www.nav.no/arbeidsgiver/kompetansetiltak-sykmeldte">
            Kompetansetiltak for sykmeldte <ExternalLinkIcon title="external link" />
          </Link>
        </li>
        <li className="mt-2">
          <Link href="https://www.nav.no/friskmelding-arbeidsformidling">
            Friskmelding til arbeidsformidling <ExternalLinkIcon title="external link" />
          </Link>
        </li>
      </ul>
    </Box>
  )
}

export default UsefulLinks
