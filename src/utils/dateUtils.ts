export function ISODateStringToLongFormat(dateISOString: string): string {
  return dateToLongFormat(new Date(dateISOString))
}

function dateToLongFormat(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const formatter = new Intl.DateTimeFormat('nb-NO', options)
  return formatter.format(date)
}
