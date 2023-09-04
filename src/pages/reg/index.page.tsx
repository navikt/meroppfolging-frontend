import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import { trpc } from '@/utils/trpc'

function Form(): ReactElement {
  const { data } = trpc.startRegistration.useQuery()
  return <div>{data?.registreringType}</div>
}

export const getServerSideProps = withAuthenticatedPage()

export default Form
