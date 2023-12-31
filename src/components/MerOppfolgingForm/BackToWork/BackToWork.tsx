import { Alert, BodyLong, Button, GuidePanel, Heading } from '@navikt/ds-react'
import { useRouter } from 'next/router'

import { FormSummaryPages } from '@/types/merOppfolgingForm'
import { getFormUrlObject } from '@/utils/utils'
import { Column } from '@/components/Containers/column'
import { logAmplitudeEvent, useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { FORM_NAME } from '@/domain/formPages'
import { SSPS_URL } from '@/constants/paths'

const uenigText = 'Uenig, jeg trenger mer veiledning'
const enigText = 'Enig'

function BackToWork(): React.ReactElement {
  const { push } = useRouter()
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
        <Heading level="2" size="small">
          Er du enig i NAV sin vurdering over?
        </Heading>

        <section className="flex gap-4">
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => {
              logAmplitudeEvent({
                eventName: 'navigere',
                data: { destinasjon: 'Oppsummering', lenketekst: uenigText },
              })
              push(getFormUrlObject(FormSummaryPages.summary))
            }}
          >
            {uenigText}
          </Button>
          <Button
            className="w-full"
            variant="secondary"
            onClick={() => {
              logAmplitudeEvent(
                {
                  eventName: 'skjema avbrutt',
                  data: { skjemanavn: FORM_NAME, steg: FormSummaryPages.backToWork },
                },
                { handling: 'Bruker klikker enig-knapp; det ikke er behov for mer oppfølging' },
              )
              push(SSPS_URL)
            }}
          >
            {enigText}
          </Button>
        </section>
      </Column>
    </>
  )
}

export default BackToWork
