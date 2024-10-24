import { formPageInverted } from '@/domain/formPages'
import { FormPage } from '@/types/merOppfolgingForm'
import { FORM_PATH } from '@/constants/appConstants'

export function getFormUrl(form: FormPage): string {
  return `${FORM_PATH}/${formPageInverted[form]}`
}
