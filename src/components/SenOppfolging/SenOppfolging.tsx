import { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'

import SenOppfolgingForm from '@/components/SenOppfolging/SenOppfolgingForm'
import MaxDateIngress from '@/components/SenOppfolging/MaxDateIngress'

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
