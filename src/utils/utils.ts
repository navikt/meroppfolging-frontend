import { differenceInCalendarDays } from 'date-fns'

import { formPageInverted } from '@/domain/formPages'
import { FormPage } from '@/types/merOppfolgingForm'
import { FORM_PATH } from '@/constants/paths'

export function getFormUrl(form: FormPage): string {
  return `${FORM_PATH}/${formPageInverted[form]}`
}

export function getLongDateFormat(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('nb-NO', options)
}

export function getDaysBetweenDateAndToday(date: Date): number {
  const today = new Date()
  return differenceInCalendarDays(date, today)
}
