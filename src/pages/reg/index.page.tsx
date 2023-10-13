import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import { trpc } from '@/utils/trpc'
import { useToggle } from '@/contexts/toggleContext'

function Form(): ReactElement {
  const { data } = trpc.startRegistration.useQuery()
  const toggle = useToggle('disableMerOppfolgingRegistering')
  return (
    <div>
      <p>{data?.registreringType}</p>
      <p>{JSON.stringify(toggle)}</p>
    </div>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default Form
