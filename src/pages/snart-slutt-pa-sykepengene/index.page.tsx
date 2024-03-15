import { ReactElement } from 'react'
import { VStack, Heading, Link, Button } from '@navikt/ds-react'
import { ChevronLeftIcon } from '@navikt/aksel-icons'

import FormPageContainer from '@/components/Containers/FormPageContainer'
import InfoSection from '@/components/SnartSluttPaSykepengene/InfoSection'
import MaxDateIngress from '@/components/SnartSluttPaSykepengene/MaxDateIngress'
import ReadMoreSection from '@/components/SnartSluttPaSykepengene/ReadMoreSection'
import { withAuthenticatedPage } from '@/auth'
import MoreGuidance from '@/components/SnartSluttPaSykepengene/MoreGuidance'

function SnartSlutt(): ReactElement {
  return (
    <FormPageContainer className="bg-bg-subtle">
      <VStack gap="6" className="max-w-4xl bg-bg-default p-4 md:p-8">
        <Heading size="xlarge" level="1" spacing>
          Snart slutt på sykepengene - hva skjer nå?
        </Heading>

        <MaxDateIngress />

        <InfoSection />

        <MoreGuidance />

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
