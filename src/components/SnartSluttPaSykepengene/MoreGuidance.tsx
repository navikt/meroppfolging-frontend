import { BodyLong, Box, Button, Heading, HStack } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import { logger } from '@navikt/next-logger'
import NextLink from 'next/link'
import { useRouter } from 'next/router'

import { getFormUrl } from '@/utils/utils'
import { INITIAL_FORM_PAGE } from '@/domain/formPages'
import { trpc } from '@/utils/trpc'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { ResponseStatus } from '@/server/services/schemas/meroppfolgingSchema'
import { createOnskerIkkeSenOppfolgingFormRequest } from '@/components/MerOppfolgingForm/requestUtils'
import { OnskerOppfolgingOrigins } from '@/domain/OnskerOppfolging'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import ResponseStatusInfoBox from '@/components/SnartSluttPaSykepengene/ResponseStatusInfoBox'
import MoreInfoSection from '@/components/SnartSluttPaSykepengene/MoreInfoSection'

function MoreGuidance(): ReactElement | null {
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
  const { reload } = useRouter()

  const status = trpc.sykmeldtStatus.useQuery()
  const mutation = trpc.submitSenOppfolging.useMutation({
    onError: () => {
      logger.error(`Client: ønsker ikke sen oppfølging form submission failed from landing`)
      setDisplayErrorMessage(true)
    },
    onSuccess: async () => {
      setDisplayErrorMessage(false)
      reload()
    },
  })

  if (status.isSuccess) {
    logAmplitudeEvent(
      {
        eventName: 'guidepanel vist',
        data: { komponent: 'SSPS - mer veiledning' },
      },
      { isSykmeldt: status.data.isSykmeldt },
    )
  }

  const handleSubmit = (): void => {
    const formRequest = createOnskerIkkeSenOppfolgingFormRequest(OnskerOppfolgingOrigins.landing)
    mutation.mutate(formRequest)
  }

  if (status.isSuccess && status.data.isSykmeldt === true) {
    return (
      <Box borderColor="border-alt-3" padding={{ xs: '4', md: '8' }} borderWidth="2" borderRadius="large">
        <Heading size="large" level="2" spacing>
          Trenger du oppfølging fra oss?
        </Heading>

        <BodyLong size="medium" spacing>
          Vi kan gi informasjon og veiledning om du har rett til andre økonomiske støtteordninger etter at sykepengene
          tar slutt.
        </BodyLong>

        {status.data.responseStatus === ResponseStatus.NO_RESPONSE ? (
          <>
            {displayErrorMessage && <ErrorMessage />}
            <HStack gap="4" className="mt-7">
              <Button
                className="min-w-28"
                onClick={() => {
                  logAmplitudeEvent({
                    eventName: 'skjema spørsmål besvart',
                    data: {
                      skjemanavn: 'Snart slutt på sykepengene',
                      spørsmål: 'Ønsker du mer veiledning?',
                      svar: 'JA',
                    },
                  })
                }}
                as={NextLink}
                href={getFormUrl(INITIAL_FORM_PAGE)}
                variant="primary"
              >
                Ja, jeg trenger oppfølging
              </Button>

              <Button
                disabled={mutation.isLoading || status.isLoading}
                onClick={() => {
                  logAmplitudeEvent({
                    eventName: 'skjema spørsmål besvart',
                    data: {
                      skjemanavn: 'Snart slutt på sykepengene',
                      spørsmål: 'Ønsker du mer veiledning?',
                      svar: 'NEI',
                    },
                  })
                  handleSubmit()
                }}
                variant="secondary"
                className="min-w-28"
              >
                Nei, jeg trenger ikke oppfølging
              </Button>
            </HStack>
          </>
        ) : (
          <>
            <ResponseStatusInfoBox responseStatus={status.data.responseStatus} />
            <MoreInfoSection />
          </>
        )}
      </Box>
    )
  }

  return null
}

export default MoreGuidance
