import { differenceInCalendarDays } from 'date-fns'

export function getLongDateFormat(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('nb-NO', options)
}

export function getDaysBetweenDateAndToday(dateString: string): number {
  const date = new Date(dateString)
  const today = new Date()
  return differenceInCalendarDays(date, today)
}
