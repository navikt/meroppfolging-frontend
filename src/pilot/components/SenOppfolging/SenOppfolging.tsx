import { ReactElement } from 'react'
import { Heading } from '@navikt/ds-react'

import MaxDateIngress from '@/pilot/components/SenOppfolging/MaxDateIngress'

function SenOppfolging({ children }: { children: ReactElement }): ReactElement {
  return (
    <>
      <Heading size="large" level="1">
        Vil du ha hjelp fra oss?
      </Heading>

      <MaxDateIngress />

      {children}
    </>
  )
}

export default SenOppfolging
