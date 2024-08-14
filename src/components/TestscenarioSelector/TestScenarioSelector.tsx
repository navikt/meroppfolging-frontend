import { Button, Modal, Radio, RadioGroup } from '@navikt/ds-react'
import React, { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'

import { getStoredPilotStatus, initializePilot, PilotStatus, storePilotStatus } from '@/mocks/testScenarioUtils'

import SunImage from '../../../public/sun.svg'

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
              <Radio value="DAGENS">Dagens løsning</Radio>
            </RadioGroup>
          </div>

          <div>
            <Button
              id="VelgScenarioButton"
              variant="primary"
              onClick={() => {
                storePilotStatus(pilotStatus)
                window.location.reload()
              }}
            >
              Velg scenario
            </Button>
            <Button variant="tertiary" onClick={() => setOpen(false)}>
              Avbryt
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <div id="TestScenarioSelector" onClick={() => setOpen(!open)} className={styles.testscenariocontainer}>
        <Image src={SunImage} alt="" width={40} height={40} />
      </div>
    </>
  )
}
