import React, { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import { trpc } from '@/utils/trpc'
import { LandingContent } from '@/components/Form/LandingContent'

function SnartSlutt(): ReactElement {
  const status = trpc.status.useQuery()
  trpc.maxDate.useQuery()

  switch (status.status) {
    case 'loading':
      return <></>
    case 'error':
      throw new Error('Beklager, det skjedede en feil ved henting av din status')
    case 'success':
      return <LandingContent status={status.data} />
    default:
      const exhaustiveCheck: never = status
      return exhaustiveCheck
  }
}

export const getServerSideProps = withAuthenticatedPage()

export default SnartSlutt
