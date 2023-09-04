import { useRouter } from 'next/router'

import { isFormPageParam } from '@/utils/tsUtils'
import { formPage } from '@/domain/formPages'
import { FormPage } from '@/types/merOppfolgingForm'

function useCurrentForm(): FormPage | null {
  const { query } = useRouter()

  const currentForm = query['form']
  const isValidFormPage = isFormPageParam(currentForm)

  if (isValidFormPage) return formPage[currentForm]
  return null
}

export default useCurrentForm
