import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react'

import { useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'

function OngoingMaintenance(): React.ReactElement {
  useLogAmplitudeEvent({ eventName: 'guidepanel vist', data: { komponent: 'Vedlikehold-side' } })

  return (
    <>
      <GuidePanel poster>
        <Heading spacing size="large" level="1">
          Vedlikehold pågår
        </Heading>

        <BodyLong>
          Sykmeldtregistreringen er ikke tilgjengelig på grunn av vedlikehold. Vennligst prøv igjen litt senere.
        </BodyLong>
      </GuidePanel>
    </>
  )
}

export default OngoingMaintenance
