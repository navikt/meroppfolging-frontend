import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import LandingPilot from '@/pilot/components/LandingPage/LandingPilot'
import { trpc } from '@/utils/trpc'
import Landing from '@/components/SnartSluttPaSykepengene/Landing'

function SnartSlutt(): ReactElement {
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
        return <LandingPilot responseStatus={status.data.responseStatus} />
      }
      return <Landing />
    default:
      const exhaustiveCheck: never = status
      return exhaustiveCheck
  }
}

export const getServerSideProps = withAuthenticatedPage()

export default SnartSlutt
