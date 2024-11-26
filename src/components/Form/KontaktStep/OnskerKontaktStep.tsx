import { ReactElement, useEffect } from 'react'
import { BodyLong } from '@navikt/ds-react'
import { PaperplaneIcon } from '@navikt/aksel-icons'

import RadioGroupForQuestion from '@/components/FormComponents/RadioGroupForQuestion'
import { NAV_PHONE_NUMBER } from '@/constants/appConstants'
import WriteToUsLink from '@/components/UI/WriteToUsLink'
import { Step } from '@/components/Form/Step'

interface Props {
  goToPreviousStep: () => void
}

const Description = (): ReactElement => {
  return (
    <>
      <BodyLong>
        Sammen kan dere kartlegge mulighetene dine, og vurdere hvilken hjelp og støtte du kan få fra Nav.
      </BodyLong>
      <BodyLong>
        Har du andre spørsmål kan du når som helst ta kontakt med oss på tlf. {NAV_PHONE_NUMBER} eller <WriteToUsLink />{' '}
        (åpner i ny fane).
      </BodyLong>
      <BodyLong>Har du en aktivitetsplan bruker du «dialog med veileder» der for å snakke med veilederen din.</BodyLong>
    </>
  )
}

export const OnskerKontaktStep = ({ goToPreviousStep }: Props): ReactElement => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Step
      heading="Bistand fra NAV"
      goToPreviousStep={goToPreviousStep}
      customNextButtonIcon={<PaperplaneIcon aria-hidden />}
      customNextButtonLabel="Send inn svarene"
    >
      <RadioGroupForQuestion questionName="BEHOV_FOR_OPPFOLGING" description={<Description />} />
    </Step>
  )
}
