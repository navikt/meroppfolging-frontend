import { useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage'

function ErrorMessageWithAmplitude(): React.ReactElement {
  useLogAmplitudeEvent({ eventName: 'alert vist', data: { variant: 'error', tekst: 'Beklager, teknisk feil' } })

  return <ErrorMessage />
}

export default ErrorMessageWithAmplitude
