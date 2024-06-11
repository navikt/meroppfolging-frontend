import { ReactElement } from 'react'
import { VStack } from '@navikt/ds-react'

import PageContainer from '@/pilot/components/containers/PageContainer'
import SenOppfolging from '@/pilot/components/SenOppfolging/SenOppfolging'
import Receipt from '@/pilot/components/Receipt/Receipt'
import { ResponseStatusPilot } from '@/server/services/schemas/statusSchema'

function LandingContent({ responseStatus }: { responseStatus: ResponseStatusPilot }): ReactElement {
  switch (responseStatus) {
    case 'NO_RESPONSE':
      return <SenOppfolging />
    case 'TRENGER_IKKE_OPPFOLGING':
    case 'TRENGER_OPPFOLGING':
      return <Receipt responseStatus={responseStatus} />
    default:
      const exhaustiveCheck: never = responseStatus
      return exhaustiveCheck
  }
}

function LandingPilot({ responseStatus }: { responseStatus: ResponseStatusPilot }): ReactElement {
  return (
    <PageContainer className="bg-bg-subtle">
      <VStack gap="8" className="max-w-4xl bg-bg-default px-4 py-8 md:p-12">
        <LandingContent responseStatus={responseStatus} />
      </VStack>
    </PageContainer>
  )
}

export default LandingPilot
