import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth/withAuthentication'
import { trpc } from '@/utils/trpc'

function Home(): ReactElement {
  const hello = trpc.hello.useQuery({ text: 'client' })
  if (!hello.data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default Home
