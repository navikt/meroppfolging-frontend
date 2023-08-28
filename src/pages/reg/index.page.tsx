import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'

function Form(): ReactElement {
  return <div>hi</div>
}

export const getServerSideProps = withAuthenticatedPage()

export default Form
