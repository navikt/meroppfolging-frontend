import { Button, Modal, Radio, RadioGroup, Tooltip } from '@navikt/ds-react'
import React, { ReactElement, useEffect, useState } from 'react'
import { SunIcon } from '@navikt/aksel-icons'

import { getStoredPilotStatus, initializePilot, PilotStatus, storePilotStatus } from '@/mocks/testScenarioUtils'

import styles from './testscenarioselector.module.css'

export const TestScenarioSelector = (): ReactElement => {
  const [open, setOpen] = useState(false)
  const [pilotStatus, setPilotStatus] = useState<PilotStatus>(getStoredPilotStatus())

  useEffect(() => {
    initializePilot()
  }, [])

  return (
    <>
      <Modal
        open={open}
        aria-label="Testdatavelger"
        onClose={() => setOpen(false)}
        header={{
          heading: 'Dagens løsning eller pilot?',
        }}
      >
        <Modal.Body>
          <div className="mb-4">
            <RadioGroup
              legend="Dagens løsning eller pilot?"
              hideLegend={true}
              value={pilotStatus}
              onChange={(val: PilotStatus) => {
                setPilotStatus(val)
              }}
            >
              <Radio value="PILOT">Pilot</Radio>
            </RadioGroup>
          </div>

          <div>
            <Tooltip content="Lagrede svar blir slettet hver gang du velger på nytt, og når du lukker nettleseren.">
              <Button
                id="VelgScenarioButton"
                variant="primary"
                onClick={() => {
                  storePilotStatus(pilotStatus)
                  window.location.reload()
                }}
              >
                Velg
              </Button>
            </Tooltip>
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
