import { ReactElement } from 'react'
import { VStack } from '@navikt/ds-react'

import PageContainer from '@/pilot/components/containers/PageContainer'
import SenOppfolging from '@/pilot/components/SenOppfolging/SenOppfolging'
import Receipt from '@/pilot/components/Receipt/Receipt'
import { PilotStatus } from '@/server/services/schemas/statusSchema'

function LandingContent({ response }: { response: PilotStatus['response'] }): ReactElement {
  if (response === null) {
    return <SenOppfolging />
  } else {
    return <Receipt response={response} />
  }
}

function LandingPilot({ status }: { status: PilotStatus }): ReactElement {
  return (
    <PageContainer className="bg-bg-subtle">
      <VStack gap="6" className="max-w-4xl bg-bg-default px-4 py-8 md:p-12">
        <LandingContent response={status.response} />
      </VStack>
    </PageContainer>
  )
}

export default LandingPilot
