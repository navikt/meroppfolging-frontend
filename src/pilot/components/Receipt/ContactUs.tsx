import { ReactElement } from 'react'
import { BodyShort, Heading, Link } from '@navikt/ds-react'

import { CONTACT_NAV_URL } from '@/constants/paths'

function ContactUs(): ReactElement {
  return (
    <>
      <Heading size="medium">Kontakt oss</Heading>
      <BodyShort>
        Ta gjerne <Link href={CONTACT_NAV_URL}>kontakt med oss</Link> hvis du trenger å snakke med en veileder i NAV
      </BodyShort>
    </>
  )
}

export default ContactUs
