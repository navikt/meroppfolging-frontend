import { ReactElement } from 'react'
import { VStack } from '@navikt/ds-react'

import PageContainer from '@/pilot/components/containers/PageContainer'
import SenOppfolging from '@/pilot/components/SenOppfolging/SenOppfolging'
import Receipt from '@/pilot/components/Receipt/Receipt'
import { StatusPilotDTO } from '@/server/services/schemas/statusSchema'
import NoAccessInformation from '@/pilot/components/LandingPage/NoAccessInformation'

function LandingContent({ status }: { status: StatusPilotDTO }): ReactElement {
  if (!status.hasAccessToSenOppfolging) {
    return <NoAccessInformation />
  }

  if (status.response === null) {
    return <SenOppfolging />
  } else {
    return <Receipt response={status.response} />
  }
}

function LandingPilot({ status }: { status: StatusPilotDTO }): ReactElement {
  return (
    <PageContainer className="bg-bg-subtle">
      <VStack gap="6" className="max-w-4xl bg-bg-default px-4 py-8 md:p-12">
        <LandingContent status={status} />
      </VStack>
    </PageContainer>
  )
}

export default LandingPilot
