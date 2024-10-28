import { ReactElement } from 'react'
import { BodyLong, Button, GuidePanel, Heading } from '@navikt/ds-react'
import Link from 'next/link'

import { withAuthenticatedPage } from '@/auth'
import { DITT_NAV } from '@/constants/appConstants'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { browserEnv } from '@/constants/envs'
import FormPageContainer from '@/components/Containers/FormPageContainer'

const linkText = 'Lenke til aktivitetsplanen.'
const lesMerText = 'Les mer'
const skalIkkeText = 'Skal ikke søke nå'

function ReceiptPage(): ReactElement {
  return (
    <FormPageContainer className="gap-4">
      <Heading level="1" spacing size="medium">
        Du kan nå få mer veiledning
      </Heading>
      <BodyLong>
        Du kan nå legge til aktiviteter i aktivitetsplanen din.
        {` `}
        <Link
          onClick={() =>
            logAmplitudeEvent(
              {
                eventName: 'navigere',
                data: { lenketekst: linkText, destinasjon: 'aktivitetsplanen' },
              },
              { fra: 'kvittering-side' },
            )
          }
          href={browserEnv.NEXT_PUBLIC_AKTIVITETSPLAN_URL}
        >
          {linkText}
        </Link>
      </BodyLong>

      <GuidePanel poster>
        <Heading level="2" spacing size="medium">
          Videre støtte etter sykepenger
        </Heading>
        <BodyLong>
          Hvis du skal søke om økonomisk støtte etter at retten til sykepenger tar slutt, må du gjøre det i en egen
          søknad.
        </BodyLong>
      </GuidePanel>
      <Link
        onClick={() =>
          logAmplitudeEvent(
            {
              eventName: 'navigere',
              data: { lenketekst: lesMerText, destinasjon: 'aktivitetsplanen' },
            },
            { fra: 'kvittering-side' },
          )
        }
        href={DITT_NAV}
        passHref
      >
        <Button className="w-fit">{lesMerText}</Button>
      </Link>
      <Link
        onClick={() =>
          logAmplitudeEvent(
            {
              eventName: 'navigere',
              data: { lenketekst: skalIkkeText, destinasjon: 'aktivitetsplanen' },
            },
            { fra: 'kvittering-side' },
          )
        }
        href={DITT_NAV}
      >
        {skalIkkeText}
      </Link>
    </FormPageContainer>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default ReceiptPage
