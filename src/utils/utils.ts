import { formPageInverted } from '@/domain/formPages'
import { FormPage } from '@/types/merOppfolgingForm'
import { FORM_PATH } from '@/constants/paths'

export function getFormUrl(form: FormPage): string {
  return `${FORM_PATH}/${formPageInverted[form]}`
}
