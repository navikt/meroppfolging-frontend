import { UrlObject } from 'url'

import { formPageInverted } from '@/domain/formPages'
import { FormPage } from '@/types/merOppfolgingForm'
import { FORM_PATH } from '@/constants/paths'

export function getFormUrlObject(form: FormPage): UrlObject {
  return {
    pathname: FORM_PATH,
    query: { form: formPageInverted[form] },
  }
}
