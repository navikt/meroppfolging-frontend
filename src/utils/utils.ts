import { UrlObject } from 'url'

import { formPageInverted } from '@/domain/formPages'
import { FormPage } from '@/types/merOppfolgingForm'

export function getFormUrlObject(form: FormPage): UrlObject {
  return {
    pathname: '/reg/[form]',
    query: { form: formPageInverted[form] },
  }
}
