import { ReactElement, useEffect } from 'react'
import { BodyLong } from '@navikt/ds-react'
import { PaperplaneIcon } from '@navikt/aksel-icons'

import RadioGroupForQuestion from '@/components/FormComponents/RadioGroupForQuestion'
import { Step } from '@/components/Step/Step'

interface Props {
  goToPreviousStep: () => void
}

const Description = (): ReactElement => {
  return (
    <>
      <BodyLong>
        En veileder kan hjelpe deg med å kartlegge mulighetene dine, og vurdere hvilken hjelp og støtte du kan få fra
        Nav. Er du allerede i kontakt med en veileder og får den oppfølgingen du trenger, kan du bare svare nei. Du
        mister ikke kontakten du allerede har med veileder.
      </BodyLong>
    </>
  )
}

export const OnskerOppfolgingStep = ({ goToPreviousStep }: Props): ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Step
      heading="Oppfølging fra Nav"
      goToPreviousStep={goToPreviousStep}
      customNextButtonIcon={<PaperplaneIcon aria-hidden />}
      customNextButtonLabel="Send inn svarene"
    >
      <RadioGroupForQuestion questionName="BEHOV_FOR_OPPFOLGING" description={<Description />} />
    </Step>
  )
}
