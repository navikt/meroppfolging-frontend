import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react'
import Link from 'next/link'

import { CONTACT_NAV_URL, NAV_PHONE_NUMBER } from '@/constants/paths'

function AlreadyRegistred(): React.ReactElement {
  return (
    <GuidePanel poster>
      <Heading spacing size="large" level="1">
        Du er allerede registrert
      </Heading>
      <BodyLong>Ønsker du mer informasjon må du ta kontakt med NAV.</BodyLong>
      <BodyLong>
        <Link href={CONTACT_NAV_URL}>Send melding til veilederen din</Link> eller ring oss på <b>{NAV_PHONE_NUMBER}</b>
      </BodyLong>
    </GuidePanel>
  )
}

export default AlreadyRegistred
