import { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'

import SenOppfolgingForm from '@/pilot/components/SenOppfolging/SenOppfolgingForm'
import { trpc } from '@/utils/trpc'
import MaxDateIngress from '@/pilot/components/SenOppfolging/MaxDateIngress'

function SenOppfolging(): ReactElement {
  trpc.maxDate.useQuery()
  return (
    <>
      <Heading size="large" level="1">
        Vil du ha hjelp fra oss?
      </Heading>

      <MaxDateIngress />

      <SenOppfolgingForm />
    </>
  )
}

export default SenOppfolging
