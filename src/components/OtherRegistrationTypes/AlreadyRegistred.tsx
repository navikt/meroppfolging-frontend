import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react'
import Link from 'next/link'

import { AKTIVITETSPLAN_URL, CONTACT_NAV_URL, NAV_PHONE_NUMBER } from '@/constants/paths'
import { logAmplitudeEvent, useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'

const linkText = 'Lenke til aktivitetsplanen.'

function AlreadyRegistred(): React.ReactElement {
  useLogAmplitudeEvent({ eventName: 'guidepanel vist', data: { komponent: 'allerede registrert-side' } })

  return (
    <GuidePanel poster>
      <Heading spacing size="large" level="1">
        Du er allerede registrert
      </Heading>
      <BodyLong>
        Du er allerede registrert og har tilgang til aktivitetsplanen.
        {` `}
        <Link
          onClick={() =>
            logAmplitudeEvent(
              {
                eventName: 'navigere',
                data: { lenketekst: linkText, destinasjon: 'aktivitetsplanen' },
              },
              { fra: 'allerede registrert-side' },
            )
          }
          href={AKTIVITETSPLAN_URL}
        >
          {linkText}
        </Link>
      </BodyLong>
      <BodyLong>Ønsker du mer informasjon må du ta kontakt med NAV.</BodyLong>
      <BodyLong>
        <Link href={CONTACT_NAV_URL}>Send melding til veilederen din</Link> eller ring oss på <b>{NAV_PHONE_NUMBER}</b>
      </BodyLong>
    </GuidePanel>
  )
}

export default AlreadyRegistred
