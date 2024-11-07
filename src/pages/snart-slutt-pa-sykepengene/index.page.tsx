import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import Landing from '@/components/LandingPage/Landing'
import { trpc } from '@/utils/trpc'

function SnartSlutt(): ReactElement {
  const status = trpc.status.useQuery()
  trpc.maxDate.useQuery()

  switch (status.status) {
    case 'loading':
      return <></>
    case 'error':
      throw new Error('Beklager, det skjedede en feil ved henting av din status')
    case 'success':
      return <Landing status={status.data} />
    default:
      const exhaustiveCheck: never = status
      return exhaustiveCheck
  }
}

export const getServerSideProps = withAuthenticatedPage()

export default SnartSlutt
