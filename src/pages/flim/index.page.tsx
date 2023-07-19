import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import { trpc } from '@/utils/trpc'

function Home(): ReactElement {
  const hello = trpc.startRegistering.useQuery()
  if (!hello.data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <p>{hello.data.registreringType}</p>
    </div>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default Home
