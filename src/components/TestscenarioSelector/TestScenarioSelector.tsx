'use client'

import { Button, Modal } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import { SunIcon } from '@navikt/aksel-icons'

import styles from './testscenarioselector.module.css'
import { publicEnv } from '@/constants/envs'

export const TestScenarioSelector = (): ReactElement => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Modal
        open={open}
        aria-label="Testdatavelger"
        onClose={() => setOpen(false)}
        header={{
          heading: 'Ønsker du å slette svaret ditt og begynne på nytt?',
        }}
      >
        <Modal.Body>
          <div>
            <Button
              id="VelgScenarioButton"
              variant="primary"
              onClick={() => {
                window.location.href = publicEnv.NEXT_PUBLIC_BASE_PATH + '/snart-slutt-pa-sykepengene'
              }}
            >
              Slett svaret mitt og begynn på nytt
            </Button>
            <Button variant="tertiary" onClick={() => setOpen(false)}>
              Avbryt
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div id="TestScenarioSelector" onClick={() => setOpen(!open)} className={styles.testscenariocontainer}>
        <SunIcon title="a11y-title" fontSize="1.5rem" width={40} height={40} />
      </div>
    </>
  )
}
