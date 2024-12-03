import { BodyLong, Button, Heading, VStack } from '@navikt/ds-react'
import Link from 'next/link'
import { ArrowRightIcon } from '@navikt/aksel-icons'
import React, { ReactElement } from 'react'

import NoAccessInformation from '@/components/NoAccessInformation/NoAccessInformation'
import Receipt from '@/components/Form/Receipt/Receipt'
import MaxDateInfo from '@/components/LandingInfo/MaxDateInfo'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { SenOppfolgingStatusDTO } from '@/server/services/schemas/statusSchema'

interface Props {
  senOppfolgingStatus: SenOppfolgingStatusDTO
}

export const Landing = ({ senOppfolgingStatus }: Props): ReactElement => {
  if (!senOppfolgingStatus.hasAccessToSenOppfolging) {
    return <NoAccessInformation />
  }

  if (senOppfolgingStatus.response) {
    return <Receipt response={senOppfolgingStatus.response} />
  }

  return (
    <VStack gap="6">
      <Heading size="large" level="1">
        Sykepengene dine tar snart slutt
      </Heading>

      <MaxDateInfo />

      <BodyLong>
        Det er viktig at du tar stilling til din økonomiske situasjon i god tid før sykepengene tar slutt.
      </BodyLong>

      <BodyLong>
        Vi ber deg svare på to spørsmål, slik at vi best mulig kan gi deg informasjon som er relevant for deg. Du får
        også muligheten til å be om oppfølging fra en veileder.
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
  )
}
