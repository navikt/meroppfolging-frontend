import React, { ReactElement } from 'react'
import { BodyLong, Heading, Skeleton, VStack } from '@navikt/ds-react'
import { BeginFormButton } from '@/components/LandingInfo/BeginFormButton'
import MaxDateInfo from '@/components/LandingInfo/MaxDateInfo'

export default function Loading(): ReactElement {
  return (
    <VStack gap="6">
      <Skeleton>
        <Heading size="large" level="1">
          Sykepengene dine tar snart slutt
        </Heading>
      </Skeleton>
      <Skeleton variant="rounded">
        <MaxDateInfo
          maxDate={{
            maxDate: new Date().toISOString(),
            gjenstaendeSykedager: '60',
            utbetaltTom: new Date().toISOString(),
          }}
        />
      </Skeleton>
      <Skeleton>
        <BodyLong>
          Det er viktig at du tar stilling til din økonomiske situasjon i god tid før sykepengene tar slutt.
        </BodyLong>
      </Skeleton>
      <Skeleton>
        <BodyLong>
          Vi ber deg svare på to spørsmål, slik at vi best mulig kan gi deg informasjon som er relevant for deg. Du får
          også muligheten til å be om oppfølging fra en veileder.
        </BodyLong>
      </Skeleton>
      <Skeleton variant="rounded">
        <BeginFormButton />
      </Skeleton>
    </VStack>
  )
}
