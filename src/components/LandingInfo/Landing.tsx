import { BodyLong, Heading, VStack } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import NoAccessInformation from '@/components/NoAccessInformation/NoAccessInformation'
import MaxDateInfo from '@/components/LandingInfo/MaxDateInfo'
import { SenOppfolgingStatusDTO } from '@/server/schemas/statusSchema'
import { BeginFormButton } from '@/components/LandingInfo/BeginFormButton'
import { MaxDateDTO } from '@/server/schemas/sykepengedagerInformasjonSchema'

interface Props {
  senOppfolgingStatus: SenOppfolgingStatusDTO
  maxDate: MaxDateDTO
}

export const Landing = ({ senOppfolgingStatus, maxDate }: Props): ReactElement => {
  if (!senOppfolgingStatus.hasAccessToSenOppfolging) {
    return <NoAccessInformation />
  }

  return (
    <VStack gap="6">
      <Heading size="large" level="1">
        Sykepengene dine tar snart slutt
      </Heading>

      <MaxDateInfo maxDate={maxDate} />

      <BodyLong>
        Det er viktig at du tar stilling til din økonomiske situasjon i god tid før sykepengene tar slutt.
      </BodyLong>

      <BodyLong>
        Vi ber deg svare på to spørsmål, slik at vi best mulig kan gi deg informasjon som er relevant for deg. Du får
        også muligheten til å be om oppfølging fra en veileder.
      </BodyLong>

      <BeginFormButton />
    </VStack>
  )
}
