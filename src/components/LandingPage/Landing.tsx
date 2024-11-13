import { ReactElement } from 'react'
import { VStack } from '@navikt/ds-react'

import PageContainer from '@/components/containers/PageContainer'
import SenOppfolging from '@/components/SenOppfolging/SenOppfolging'
import Receipt from '@/components/Receipt/Receipt'
import { StatusDTO } from '@/server/services/schemas/statusSchema'
import NoAccessInformation from '@/components/LandingPage/NoAccessInformation'

function LandingContent({ status }: { status: StatusDTO }): ReactElement {
  if (!status.hasAccessToSenOppfolging) {
    return <NoAccessInformation />
  }

  if (status.response === null) {
    return <SenOppfolging />
  } else {
    return <Receipt response={status.response} />
  }
}

function Landing({ status }: { status: StatusDTO }): ReactElement {
  return (
    <PageContainer className="bg-bg-subtle">
      <VStack gap="6" className="max-w-4xl bg-bg-default px-4 py-8 md:p-12">
        <LandingContent status={status} />
      </VStack>
    </PageContainer>
  )
}

export default Landing
