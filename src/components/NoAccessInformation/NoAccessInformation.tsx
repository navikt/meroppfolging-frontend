'use client'

import { ReactElement } from 'react'
import { BodyShort, Box, Button, Heading } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import Image from 'next/image'

import WriteToUsLink from '@/components/UI/WriteToUsLink'
import pageErrorDad from '@/components/ErrorBoundary/Images/error-page-dad.svg'
import { NavPhoneNumber } from '@/components/UI/NavPhoneNumber'
import { useLogAnalyticsEvent } from '@/libs/analytics/analytics'

function NoAccessInformation(): ReactElement {
  const logMessage = "User visited SenOppfolging page, but does not have access. Showing 'You cannot access form' page."
  logger.warn(logMessage)
  useLogAnalyticsEvent({ eventName: 'besøk' }, { info: logMessage })

  return (
    <Box className="md:pt-20 md:pb-16 flex flex-col gap-8 items-start">
      <div className="flex flex-col md:flex-row gap-6 max-md:items-center">
        <Image width={202} height={240} src={pageErrorDad} alt="" className="max-md:h-[170px] h-[240px] w-[202px] " />
        <div>
          <Heading level="1" size="large" spacing>
            Beklager, du kan ikke svare på dette skjemaet nå.
          </Heading>
          <BodyShort spacing>
            Dette skjemaet er ikke åpnet for deg. Skjemaet skal være åpnet dersom du er sykmeldt og nærmer deg slutten
            på perioden du kan motta sykepenger, og du har fått et varsel som lenker hit.
          </BodyShort>
          <BodyShort>
            Hvis du mener det har skjedd en feil, prøv igjen senere. Hvis feilen vedvarer, ta kontakt med oss på tlf.{' '}
            <NavPhoneNumber /> eller på <WriteToUsLink /> (åpner i ny fane).
          </BodyShort>
        </div>
      </div>
      <Button as="a" href="https://www.nav.no/minside">
        Gå til Min side
      </Button>
    </Box>
  )
}

export default NoAccessInformation
