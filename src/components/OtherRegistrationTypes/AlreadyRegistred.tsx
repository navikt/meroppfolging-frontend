import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react'
import Link from 'next/link'

import { logAmplitudeEvent, useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { browserEnv } from '@/constants/envs'

const dialogLinkText = 'Min dialog med veileder'
const aktivitetsplanLinkText = 'aktivitetsplanen din'

function AlreadyRegistred(): React.ReactElement {
  useLogAmplitudeEvent({ eventName: 'guidepanel vist', data: { komponent: 'allerede registrert-side' } })

  return (
    <GuidePanel poster>
      <Heading spacing size="large" level="1">
        Du har allerede en aktivitetsplan
      </Heading>
      <BodyLong>
        Har du ikke hørt noe fra veilederen din? Du kan ta direkte kontakt med veilederen din i{` `}
        <Link
          onClick={() =>
            logAmplitudeEvent(
              {
                eventName: 'navigere',
                data: { lenketekst: dialogLinkText, destinasjon: 'arbeidsrettet-dialog' },
              },
              { fra: 'allerede registrert-side' },
            )
          }
          href={browserEnv.NEXT_PUBLIC_ARBEIDSRETTET_DIALOG_URL}
        >
          {dialogLinkText}.
        </Link>
      </BodyLong>
      <BodyLong>
        Du kan også se på{` `}
        <Link
          onClick={() =>
            logAmplitudeEvent(
              {
                eventName: 'navigere',
                data: { lenketekst: aktivitetsplanLinkText, destinasjon: 'aktivitetsplanen' },
              },
              { fra: 'allerede registrert-side' },
            )
          }
          href={browserEnv.NEXT_PUBLIC_AKTIVITETSPLAN_URL}
        >
          {aktivitetsplanLinkText}.
        </Link>
      </BodyLong>
    </GuidePanel>
  )
}

export default AlreadyRegistred
