import { useRouter } from 'next/router'

import { isFormPage } from '@/utils/tsUtils'
import { formPage } from '@/components/MerOppfolgingForm/utils/formValues'
import { FormPage } from '@/types/merOppfolgingForm'

function useCurrentForm(): FormPage {
  const { query } = useRouter()
  const currentForm = query['form']

  if (isFormPage(currentForm)) return formPage[currentForm]
  throw new Error('useCurrentForm must be used within a FormPage')
}

export default useCurrentForm
