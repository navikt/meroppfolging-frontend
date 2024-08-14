import { BodyLong, Button, Modal } from '@navikt/ds-react'
import { useRef } from 'react'
import { useRouter } from 'next/router'

import { SSPS_URL } from '@/constants/paths'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import useCurrentForm from '@/hooks/useCurrentForm'
import { FORM_NAME } from '@/domain/formPages'

function FormCancelLink(): React.ReactElement {
  const ref = useRef<HTMLDialogElement>(null)
  const currentForm = useCurrentForm()
  const { push } = useRouter()

  return (
    <>
      <Button
        variant="secondary"
        className="w-fit"
        onClick={(event) => {
          event.preventDefault()
          ref.current?.showModal()
        }}
      >
        Avbryt registreringen
      </Button>

      <Modal ref={ref} header={{ heading: 'Avbryt registreringen' }}>
        <Modal.Body>
          <BodyLong>Er du sikker på at du vil avbryte registreringen?</BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            onClick={(event) => {
              event.preventDefault()
              logAmplitudeEvent({
                eventName: 'skjema avbrutt',
                data: { skjemanavn: FORM_NAME, steg: currentForm || 'ukjent' },
              })
              ref.current?.close()
              push('/snart-slutt-pa-sykepengene')
            }}
          >
            Ja, avbryt
          </Button>
          <Button type="button" variant="secondary" onClick={() => ref.current?.close()}>
            Nei
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default FormCancelLink
