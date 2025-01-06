import { ReactElement } from 'react'
import { Box, Heading, List } from '@navikt/ds-react'

import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

const NyttigeLenker = (): ReactElement => (
  <Box>
    <Heading size="medium" spacing>
      Informasjon fra Nav som kan være nyttig for deg
    </Heading>

    <List>
      <List.Item>
        <TrackedExternalLink href="https://www.nav.no/syk-lenge" openingInNewTabIconInsteadOfText>
          Når du har vært syk eller skadet lenge
        </TrackedExternalLink>
      </List.Item>

      <List.Item>
        <TrackedExternalLink href="https://www.nav.no/aap" openingInNewTabIconInsteadOfText>
          Arbeidsavklaringspenger (AAP)
        </TrackedExternalLink>
      </List.Item>

      <List.Item>
        <TrackedExternalLink href="https://www.nav.no/friskmelding-arbeidsformidling" openingInNewTabIconInsteadOfText>
          Friskmelding til arbeidsformidling
        </TrackedExternalLink>
      </List.Item>

      <List.Item>
        <TrackedExternalLink href="https://www.nav.no/varig-sykdom-skade#pengestotte" openingInNewTabIconInsteadOfText>
          Aktuelle pengestøtter når du ikke kan jobbe
        </TrackedExternalLink>
      </List.Item>
    </List>
  </Box>
)

export default NyttigeLenker
