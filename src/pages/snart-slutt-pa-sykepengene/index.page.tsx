import React, { ReactElement } from 'react'
import { BodyLong, Button, Heading, VStack } from '@navikt/ds-react'
import Link from 'next/link'
import { ArrowRightIcon } from '@navikt/aksel-icons'

import { withAuthenticatedPage } from '@/auth'
import MaxDateInfo from '@/components/LandingInfo/MaxDateInfo'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'

function SnartSlutt(): ReactElement {
  return (
    <>
      <VStack gap="6">
        <Heading size="large" level="1">
          Sykepengene dine tar snart slutt
        </Heading>
        <MaxDateInfo />

        <BodyLong>
          Det er viktig at du tar stilling til din økonomiske situasjon i god tid før sykepengene tar slutt.
        </BodyLong>

        <BodyLong>
          Vi ber deg svare på noen spørsmål, slik at vi best mulig kan gi deg informasjon som er relevant for deg, og
          hjelpe deg hvis du har behov for det.
        </BodyLong>

        <Link href="/snart-slutt-pa-sykepengene/skjema" passHref>
          <Button
            type="button"
            icon={<ArrowRightIcon aria-hidden />}
            iconPosition="right"
            onClick={() =>
              logAmplitudeEvent({
                eventName: 'skjema startet',
                data: {
                  skjemanavn: 'Snart slutt på sykepengene',
                },
              })
            }
          >
            Gå videre
          </Button>
        </Link>
      </VStack>
    </>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default SnartSlutt
