import { ReactElement } from 'react'
import { Heading, VStack } from '@navikt/ds-react'

import PageContainer from '@/pilot/components/containers/PageContainer'
import Receipt from '@/pilot/components/Receipt/Receipt'
import { PilotStatus } from '@/server/services/schemas/statusSchema'
import SenOppfolgingVeiledning from '@/pilot/components/SenOppfolgingVeiledningProto/SenOppfolgingVeiledning'
import MaxDateIngressVeiledning from '@/pilot/components/SenOppfolgingVeiledningProto/MaxDateIngressVeiledning'

function LandingVeiledning({ status }: { status: PilotStatus }): ReactElement {
  return (
    <PageContainer className="bg-bg-subtle">
      <VStack gap="6" className="max-w-4xl bg-bg-default px-4 py-8 md:p-12">
        <Heading size="large" level="1">
          Det er snart slutt på perioden du kan få sykepenger
        </Heading>

        {status.response ? (
          <Receipt response={status.response} />
        ) : (
          <>
            <MaxDateIngressVeiledning />
            <SenOppfolgingVeiledning />
          </>
        )}
      </VStack>
    </PageContainer>
  )
}

export default LandingVeiledning
