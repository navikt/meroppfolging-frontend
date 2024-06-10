import { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

function ContactUs(): ReactElement {
  return (
    <>
      <Heading size="medium">Kontakt oss</Heading>
      <BodyShort>Ta gjerne kontakt med oss hvis du trenger å snakke med en veileder i NAV</BodyShort>
    </>
  )
}

export default ContactUs
