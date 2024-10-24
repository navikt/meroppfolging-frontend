import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react'
import Link from 'next/link'

import { CONTACT_NAV_URL, NAV_PHONE_NUMBER } from '@/constants/appConstants'

function AlreadyResponded(): React.ReactElement {
  return (
    <GuidePanel poster>
      <Heading spacing size="large" level="1">
        Det ser ut til at du allerede har svart på registreringen
      </Heading>
      <BodyLong>For at NAV skal kunne hjelpe deg videre, må vi hjelpe deg i andre kanaler.</BodyLong>
      <BodyLong>
        <Link href={CONTACT_NAV_URL}>Send melding til veilederen din</Link> eller ring oss på <b>{NAV_PHONE_NUMBER}</b>
      </BodyLong>
    </GuidePanel>
  )
}

export default AlreadyResponded
