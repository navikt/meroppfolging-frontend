import { useRouter } from 'next/router'

import { isFormPageParam } from '@/utils/tsUtils'
import { formPage } from '@/domain/formPages'
import { FormPage } from '@/types/merOppfolgingForm'
import { FORM_PATH } from '@/constants/paths'

function useCurrentForm(): FormPage | null {
  const { query, pathname } = useRouter()

  if (pathname !== FORM_PATH) throw new Error('useCurrentForm should not be used outside form pages')

  const currentForm = query['form']
  const isValidFormPage = isFormPageParam(currentForm)

  if (isValidFormPage) return formPage[currentForm]
  return null
}

export default useCurrentForm
