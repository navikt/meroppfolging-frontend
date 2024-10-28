import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import LandingPilot from '@/pilot/components/LandingPage/LandingPilot'
import { trpc } from '@/utils/trpc'

function SnartSlutt(): ReactElement {
  const status = trpc.statusPilot.useQuery()
  trpc.maxDate.useQuery()
  trpc.sykmeldtStatus.useQuery()

  switch (status.status) {
    case 'loading':
      return <></>
    case 'error':
      throw new Error('Beklager, det skjedede en feil ved henting av din status')
    case 'success':
      return <LandingPilot status={status.data} />
    default:
      const exhaustiveCheck: never = status
      return exhaustiveCheck
  }
}

export const getServerSideProps = withAuthenticatedPage()

export default SnartSlutt
