import { ReactElement } from 'react'
import { BodyShort, Box, Heading, Link } from '@navikt/ds-react'

import { CONTACT_NAV_URL } from '@/constants/paths'

function ContactUs(): ReactElement {
  return (
    <Box>
      <Heading size="medium" level="2" spacing>
        Kontakt oss
      </Heading>
      <BodyShort>
        Ta gjerne <Link href={CONTACT_NAV_URL}>kontakt med oss</Link> hvis du trenger å snakke med en veileder i NAV
      </BodyShort>
    </Box>
  )
}

export default ContactUs
