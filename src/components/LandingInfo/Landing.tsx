import { BodyLong, Heading, VStack } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import NoAccessInformation from '@/components/NoAccessInformation/NoAccessInformation'
import Receipt from '@/components/Form/Receipt/Receipt'
import MaxDateInfo from '@/components/LandingInfo/MaxDateInfo'
import { SenOppfolgingStatusDTO } from '@/server/services/schemas/statusSchema'
import { BeginFormButton } from '@/components/LandingInfo/BeginFormButton'
import { MaxDateDTO } from '@/server/services/schemas/sykepengedagerInformasjonSchema'

interface Props {
  senOppfolgingStatus: SenOppfolgingStatusDTO
  maxDate: MaxDateDTO
}

export const Landing = ({ senOppfolgingStatus, maxDate }: Props): ReactElement => {
  if (!senOppfolgingStatus.hasAccessToSenOppfolging) {
    return <NoAccessInformation />
  }

  if (senOppfolgingStatus.response) {
    return (
      <Receipt
        response={senOppfolgingStatus.response}
        responseDateISOString={senOppfolgingStatus.responseDateTime}
        maxDate={maxDate}
      />
    )
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
