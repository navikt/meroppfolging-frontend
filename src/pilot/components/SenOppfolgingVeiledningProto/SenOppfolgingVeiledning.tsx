import { ReactElement, useState } from 'react'
import { Box, Button, HStack, Stepper } from '@navikt/ds-react'
import { ChevronLeftIcon, ChevronRightIcon } from '@navikt/aksel-icons'

import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/pilot/domain/answerValues'
import Steg1FremtidigSituasjonSporsmal from '@/pilot/components/SenOppfolgingVeiledningProto/VeiledningSteg/Steg1FremtidigSituasjonSporsmal'
import Steg3SnakkeMedVeilederSporsmal from '@/pilot/components/SenOppfolgingVeiledningProto/VeiledningSteg/Steg3SnakkeMedVeilederSporsmal'
import Steg2Informasjon from './VeiledningSteg/Steg2Informasjon'
import { createFormRequest } from '../SenOppfolging/requestUtils'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'

const maxVeiviserStep = 3

function SenOppfolgingVeiledning(): ReactElement {
  const { reload } = useRouter()

  const [veiviserStep, setVeiviserStep] = useState(1)
  const [fremtidigSituasjonAnswer, setFremtidigSituasjonAnswer] = useState<FremtidigSituasjonAnswerTypes | null>(null)
  const [behovForOppfolgingAnswer, setBehovForOppfolgingAnswer] = useState<BehovForOppfolgingAnswerTypes | null>(null)

  const isNextButtonDisabled = veiviserStep === 1 && fremtidigSituasjonAnswer === null
  const isSubmitButtonDisabled = behovForOppfolgingAnswer === null

  function goToNextStep(): void {
    if (veiviserStep < maxVeiviserStep) {
      setVeiviserStep((veiviserStep) => veiviserStep + 1)
    }
  }

  function goToPreviousStep(): void {
    if (veiviserStep > 1) {
      setVeiviserStep((veiviserStep) => veiviserStep - 1)
    }
  }

  const mutation = trpc.submitPilotForm.useMutation({
    onError: () => {
      // setDisplayErrorMessage(true)
    },
    onSuccess: () => {
      reload()
    },
  })

  function onSubmitAnswers(): void {
    if (behovForOppfolgingAnswer && fremtidigSituasjonAnswer) {
      const request = createFormRequest({
        BEHOV_FOR_OPPFOLGING: behovForOppfolgingAnswer,
        FREMTIDIG_SITUASJON: fremtidigSituasjonAnswer,
      })
      mutation.mutate(request)
    }
  }

  return (
    <Box borderColor="border-default" borderRadius="medium" borderWidth="1" padding="6">
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={veiviserStep}
        orientation="horizontal"
        interactive={true}
        className="mb-8"
      >
        <Stepper.Step href="#">Fremtidig situasjon</Stepper.Step>
        <Stepper.Step href="#">Informasjon</Stepper.Step>
        <Stepper.Step href="#">Ønsker du å bli kontaktet?</Stepper.Step>
      </Stepper>

      {veiviserStep === 1 && (
        <Steg1FremtidigSituasjonSporsmal onAnswerChange={(answer) => setFremtidigSituasjonAnswer(answer)} />
      )}
      {veiviserStep === 2 && fremtidigSituasjonAnswer && (
        <Steg2Informasjon fremtidigSituasjonAnswer={fremtidigSituasjonAnswer} />
      )}
      {veiviserStep === 3 && (
        <Steg3SnakkeMedVeilederSporsmal onAnswerChange={(answer) => setBehovForOppfolgingAnswer(answer)} />
      )}

      {/* <Receipt fremtidigSituasjonAnswer={fremtidigSituasjonAnswer} /> */}

      <HStack justify="space-between" className="mt-6">
        {veiviserStep > 1 ? (
          <Button onClick={goToPreviousStep} className="w-fit" icon={<ChevronLeftIcon />} iconPosition="left">
            Tilbake
          </Button>
        ) : (
          <div />
        )}

        {veiviserStep < maxVeiviserStep ? (
          <Button
            onClick={goToNextStep}
            disabled={isNextButtonDisabled}
            icon={<ChevronRightIcon />}
            iconPosition="right"
            className="w-fit"
          >
            Gå videre
          </Button>
        ) : (
          veiviserStep === 3 && (
            <Button onClick={onSubmitAnswers} disabled={isSubmitButtonDisabled} className="w-fit">
              Send inn svar
            </Button>
          )
        )}
      </HStack>
    </Box>
  )
}

export default SenOppfolgingVeiledning
