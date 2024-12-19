import { ReactElement } from 'react'
import { BodyLong, Box, Heading } from '@navikt/ds-react'

import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

const KontaktInformasjon = (): ReactElement => (
  <Box>
    <Heading size="medium" spacing>
      Har du andre spørsmål?
    </Heading>

    <BodyLong>
      Du kan når som helst ta kontakt med oss på telefon 55&nbsp;55&nbsp;33&nbsp;33 eller{' '}
      <TrackedExternalLink href="https://www.nav.no/kontaktoss">ved å skrive til oss</TrackedExternalLink>.
    </BodyLong>
  </Box>
)

export default KontaktInformasjon
