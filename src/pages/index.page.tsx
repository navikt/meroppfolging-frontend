import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import MultistepForm from '@/components/MerOppfolgingForm/MultistepForm'
import { MerOppfolgingFormProvider } from '@/contexts/formContext'

function Home(): ReactElement {
  return (
    <MerOppfolgingFormProvider>
      <MultistepForm></MultistepForm>
    </MerOppfolgingFormProvider>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default Home
