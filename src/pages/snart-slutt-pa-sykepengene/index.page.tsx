import { ReactElement, useEffect } from 'react'
import { Button, Heading, Link, VStack } from '@navikt/ds-react'
import { ChevronLeftIcon } from '@navikt/aksel-icons'

import FormPageContainer from '@/components/Containers/FormPageContainer'
import InfoSection from '@/components/SnartSluttPaSykepengene/InfoSection'
import MaxDateIngress from '@/components/SnartSluttPaSykepengene/MaxDateIngress'
import { withAuthenticatedPage } from '@/auth'
import MoreGuidance from '@/components/SnartSluttPaSykepengene/MoreGuidance'
import { trpc } from '@/utils/trpc'

function SnartSlutt(): ReactElement {
  const visitSenOppfolgingMutation = trpc.visit.useMutation()

  useEffect(() => {
    const hasVisitedSenOppfolging = sessionStorage.getItem('visited_sen_oppfolging')

    if (!hasVisitedSenOppfolging) {
      visitSenOppfolgingMutation.mutate()
      sessionStorage.setItem('visited_sen_oppfolging', 'true')
    }
  }, [])

  return (
    <FormPageContainer className="bg-bg-subtle">
      <VStack gap="6" className="max-w-4xl bg-bg-default p-4 md:p-12">
        <Heading size="xlarge" level="1">
          Snart slutt på sykepengene
        </Heading>

        <MaxDateIngress />

        <InfoSection />

        <MoreGuidance />

        <Link href="https://www.nav.no/syk/sykefravaer">
          <Button variant="tertiary" icon={<ChevronLeftIcon aria-hidden />}>
            Ditt sykefravær
          </Button>
        </Link>
      </VStack>
    </FormPageContainer>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default SnartSlutt
