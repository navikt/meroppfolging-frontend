import { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'

import SenOppfolgingForm from '@/pilot/components/SenOppfolging/SenOppfolgingForm'
import MaxDateIngress from '@/pilot/components/SenOppfolging/MaxDateIngress'

function SenOppfolging(): ReactElement {
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
