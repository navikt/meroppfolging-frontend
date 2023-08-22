import { ReactElement } from 'react'

import { withAuthenticatedPage } from '@/auth'
import MultistepForm from '@/components/MerOppfolgingForm/MultistepForm'
import { MerOppfolgingFormProvider } from '@/contexts/formContext'

function Page(): ReactElement {
  return (
    <MerOppfolgingFormProvider>
      <MultistepForm />
    </MerOppfolgingFormProvider>
  )
}

export const getServerSideProps = withAuthenticatedPage()

export default Page
