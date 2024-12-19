export function ISODateStringToLongFormat(dateISOString: string): string {
  return dateToLongFormat(new Date(dateISOString))
}

function dateToLongFormat(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return date.toLocaleDateString('nb-NO', options)
}
