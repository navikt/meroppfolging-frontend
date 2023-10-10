import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react'
import Link from 'next/link'

import { CONTACT_NAV_URL, NAV_PHONE_NUMBER } from '@/constants/paths'
import { useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'

function OtherRegistrations(): React.ReactElement {
  useLogAmplitudeEvent({ eventName: 'besøk' }, { side: 'Annen type registrert-side' })

  return (
    <GuidePanel poster>
      <Heading spacing size="large" level="1">
        Vi må hjelpe deg videre i andre kanaler
      </Heading>
      <BodyLong>For at du skal få registrert deg for mer oppfølging må vi hjelpe deg videre.</BodyLong>
      <BodyLong>
        <Link href={CONTACT_NAV_URL}>Send melding til veilederen din</Link> eller ring oss på <b>{NAV_PHONE_NUMBER}</b>
      </BodyLong>
    </GuidePanel>
  )
}

export default OtherRegistrations