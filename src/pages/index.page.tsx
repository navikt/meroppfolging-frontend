import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth/withAuthentication'

function Home(): ReactElement {
  return <main>Buuu</main>
}

export const getServerSideProps = withAuthenticatedPage()

export default Home
