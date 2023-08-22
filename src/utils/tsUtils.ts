import { formPage } from '../components/MerOppfolgingForm/utils/formValues'

import { SporsmalId } from '@/types/merOppfolgingForm'

export function isSporsmalId(value: string): value is SporsmalId {
  return value in SporsmalId
}

export function isFormPage(value: string | string[] | undefined): value is keyof typeof formPage {
  if (!value) return false
  if (Array.isArray(value)) return false
  return value in Object.keys(formPage)
}
