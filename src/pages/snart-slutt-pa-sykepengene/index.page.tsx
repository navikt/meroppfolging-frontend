import { ReactElement } from 'react'
import { VStack, Heading, BodyLong, Link, Button, GuidePanel, List } from '@navikt/ds-react'
import { ChevronLeftIcon } from '@navikt/aksel-icons'
import { useRouter } from 'next/router'

import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import FormPageContainer from '@/components/Containers/FormPageContainer'
import InfoSection from '@/components/SnartSluttPaSykepengene/InfoSection'
import MaxDateIngress from '@/components/SnartSluttPaSykepengene/MaxDateIngress'
import ReadMoreSection from '@/components/SnartSluttPaSykepengene/ReadMoreSection'
import { getFormUrlObject } from '@/utils/utils'
import { INITIAL_FORM_PAGE } from '@/domain/formPages'
import { withAuthenticatedPage } from '@/auth'

function SnartSlutt(): ReactElement {
  const { push } = useRouter()
  return (
    <FormPageContainer className="bg-bg-subtle">
      <VStack gap="6" className="max-w-4xl bg-bg-default p-4 md:p-8">
        <Heading size="xlarge" level="1" spacing>
          Snart slutt på sykepengene - hva skjer nå?
        </Heading>

        <MaxDateIngress />

        <InfoSection />

        <GuidePanel poster>
          <Heading size="large" level="2" spacing>
            Ønsker du mer veiledning?
          </Heading>

          <BodyLong size="medium" spacing>
            Hvis du tror at du fortsatt vil være syk etter at sykepengene tar slutt, må du registrere deg for mer
            veiledning.
          </BodyLong>

          <List>
            <List.Item>Du kan snakke med veilederen din om mulighetene dine fremover</List.Item>
            <List.Item>Du får informasjon om du har krav på annen økonomisk støtte</List.Item>
          </List>

          <Button
            variant="primary"
            onClick={() => {
              logAmplitudeEvent({
                eventName: 'skjema spørsmål besvart',
                data: { skjemanavn: 'Snart slutt på sykepengene', spørsmål: 'Ønsker du mer veiledning?', svar: 'JA' },
              })
              push(getFormUrlObject(INITIAL_FORM_PAGE))
            }}
          >
            Jeg trenger mer veiledning
          </Button>
        </GuidePanel>

        <ReadMoreSection />

        <Link href="https://www.nav.no/syk/sykefravaer">
          <Button variant="tertiary" icon={<ChevronLeftIcon aria-hidden />}>
            Ditt sykefravaer
          </Button>
        </Link>
      </VStack>
    </FormPageContainer>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default SnartSlutt
