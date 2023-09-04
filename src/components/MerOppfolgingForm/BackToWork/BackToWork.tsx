import { Alert, BodyLong, Button, GuidePanel, Heading } from '@navikt/ds-react'
import { useRouter } from 'next/router'

import { FormSummaryPages } from '@/types/merOppfolgingForm'
import { getFormUrlObject } from '@/utils/utils'

function BackToWork(): React.ReactElement {
  const { push } = useRouter()

  return (
    <div>
      <GuidePanel poster>
        <BodyLong>
          På spørsmål om hva du mener er din fremtidige situasjon, har du svart at du skal tilbake i full jobb før du
          har vært sykmeldt i 52 uker.
        </BodyLong>
        <section>
          <Heading level="1" size="small">
            Fordi du skal tilbake i full jobb innen 52 uker
          </Heading>
          <ul>
            <li>Har du ikke rett til videre økonomisk støtte fra NAV etter at du er tilbake i jobb</li>
            <li>Tror vi ikke du trenger mer veiledning fra NAV i tillegg til det du allerede har fått og får i dag</li>
          </ul>
        </section>
        <Alert variant="info" inline={true}>
          Hvis situasjonen din endrer seg, er det viktig at du tar kontakt med veilederen din.
        </Alert>
      </GuidePanel>

      <Heading level="1" size="small">
        Er du enig i NAV sin vurdering over?
      </Heading>
      <section>
        <Button variant="secondary" onClick={() => push(getFormUrlObject(FormSummaryPages.summary))}>
          Uenig, jeg trenger mer veiledning
        </Button>
        <Button variant="secondary">Enig</Button>
      </section>
    </div>
  )
}

export default BackToWork
