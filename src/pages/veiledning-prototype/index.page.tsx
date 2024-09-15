import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import { trpc } from '@/utils/trpc'
import Landing from '@/components/SnartSluttPaSykepengene/Landing'
import LandingVeiledning from '@/pilot/components/SenOppfolgingVeiledningProto/LandingVeiledning'

function SnartSluttVeiledningPrototype(): ReactElement {
  const status = trpc.statusPilot.useQuery()
  trpc.maxDate.useQuery()
  trpc.sykmeldtStatus.useQuery()

  switch (status.status) {
    case 'loading':
      return <></>
    case 'error':
      return <Landing />
    case 'success':
      if (status.data.isPilot) {
        return <LandingVeiledning status={status.data} />
      }
      return <Landing />
    default:
      const exhaustiveCheck: never = status
      return exhaustiveCheck
  }
}

export const getServerSideProps = withAuthenticatedPage()

export default SnartSluttVeiledningPrototype
