import { ReactElement } from 'react'
import { Alert, BodyShort, Heading } from '@navikt/ds-react'

import InfoSection from '@/pilot/components/Receipt/InfoSection'
import ContactUs from '@/pilot/components/Receipt/ContactUs'
import MaxDateIngress from '@/components/SnartSluttPaSykepengene/MaxDateIngress'
import UsefulLinks from '@/pilot/components/Receipt/UsefulLinks'

function Receipt({
  responseStatus,
}: {
  responseStatus: 'TRENGER_OPPFOLGING' | 'TRENGER_IKKE_OPPFOLGING'
}): ReactElement {
  return (
    <>
      <Heading size="large" level="1">
        Trenger du hjelp fra oss?
      </Heading>
      <Alert variant="success">
        <b>Takk, svarene dine er sendt til NAV</b>
        {responseStatus === 'TRENGER_OPPFOLGING' && (
          <BodyShort>En veileder vil ta kontakt med deg for å hjelpe deg videre</BodyShort>
        )}
      </Alert>

      <MaxDateIngress />
      <InfoSection />
      <UsefulLinks />
      <ContactUs />
    </>
  )
}

export default Receipt
