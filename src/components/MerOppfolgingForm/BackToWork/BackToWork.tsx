import { Alert, BodyLong, Button, GuidePanel, Heading } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { logger } from '@navikt/next-logger'
import React, { useState } from 'react'

import { FormSummaryPages } from '@/types/merOppfolgingForm'
import { Column } from '@/components/Containers/column'
import { logAmplitudeEvent, useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { FORM_NAME } from '@/domain/formPages'
import { getFormUrl } from '@/utils/utils'
import { createOnskerIkkeSenOppfolgingFormRequest } from '@/components/MerOppfolgingForm/requestUtils'
import { OnskerOppfolgingOrigins } from '@/domain/OnskerOppfolging'
import { trpc } from '@/utils/trpc'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'
import AdditionalInfoSection from '@/components/SnartSluttPaSykepengene/AdditionalInfoSection'

const uenigText = 'Uenig, jeg trenger mer veiledning'
const enigText = 'Enig'

function BackToWork(): React.ReactElement {
  const { push } = useRouter()
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false)
  const [hasResponded, setHasResponded] = useState(false)

  const mutation = trpc.submitSenOppfolging.useMutation({
    onError: () => {
      logger.error(`Client: ønsker ikke sen oppfølging form submission failed from tilbake i arbeid-side`)
      setDisplayErrorMessage(true)
    },
    onSuccess: () => {
      setDisplayErrorMessage(false)
      setHasResponded(true)
    },
  })

  const handleSubmit = (): void => {
    const formRequest = createOnskerIkkeSenOppfolgingFormRequest(OnskerOppfolgingOrigins.form)
    mutation.mutate(formRequest)
  }

  useLogAmplitudeEvent({
    eventName: 'skjema steg startet',
    data: { skjemanavn: FORM_NAME, steg: FormSummaryPages.backToWork },
  })

  return (
    <>
      <GuidePanel poster>
        <Column>
          <BodyLong>
            På spørsmål om hva du mener er din fremtidige situasjon, har du svart at du skal tilbake i full jobb før du
            har vært sykmeldt i 52 uker.
          </BodyLong>

          <section>
            <Heading level="1" size="small">
              Fordi du skal tilbake i full jobb innen 52 uker
            </Heading>

            <ul className="list-disc list-inside">
              <li>Har du ikke rett til videre økonomisk støtte fra NAV etter at du er tilbake i jobb</li>
              <li>
                Tror vi ikke du trenger mer veiledning fra NAV i tillegg til det du allerede har fått og får i dag
              </li>
            </ul>
          </section>

          <Alert variant="info" inline={true}>
            Hvis situasjonen din endrer seg, er det viktig at du tar kontakt med veilederen din.
          </Alert>
        </Column>
      </GuidePanel>

      <Column className="gap-4">
        {displayErrorMessage && <ErrorMessage />}
        <Heading level="2" size="small">
          Er du enig i NAV sin vurdering over?
        </Heading>

        {!hasResponded ? (
          <section className="flex gap-4">
            <Button
              onClick={() => {
                logAmplitudeEvent({
                  eventName: 'navigere',
                  data: { destinasjon: 'Oppsummering', lenketekst: uenigText },
                })
                push(getFormUrl(FormSummaryPages.summary))
              }}
            >
              {uenigText}
            </Button>
            <Button
              disabled={mutation.isLoading}
              onClick={() => {
                logAmplitudeEvent({
                  eventName: 'skjema spørsmål besvart',
                  data: {
                    skjemanavn: 'Er du enig i NAV sin vurdering over?',
                    spørsmål: 'Er du enig i NAV sin vurdering over?',
                    svar: 'Enig',
                  },
                })
                handleSubmit()
              }}
              variant="secondary"
              className="min-w-28"
            >
              {enigText}
            </Button>
          </section>
        ) : (
          <>
            <Alert variant="success">Takk! Du har svart at du er enig i NAV sin vurdering.</Alert>
            <AdditionalInfoSection />
          </>
        )}
      </Column>
    </>
  )
}

export default BackToWork
