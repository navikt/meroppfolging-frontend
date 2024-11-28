import React, { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import { trpc } from '@/utils/trpc'
import { Landing } from '@/components/LandingInfo/Landing'

function SnartSlutt(): ReactElement {
  const senOppfolgingStatus = trpc.senOppfolgingStatus.useQuery()

  switch (senOppfolgingStatus.status) {
    case 'loading':
      return <></>
    case 'error':
      throw new Error('Beklager, det skjedede en feil ved henting av din status')
    case 'success':
      return <Landing senOppfolgingStatus={senOppfolgingStatus.data} />
    default:
      const exhaustiveCheck: never = senOppfolgingStatus
      return exhaustiveCheck
  }
}

export const getServerSideProps = withAuthenticatedPage()

export default SnartSlutt
