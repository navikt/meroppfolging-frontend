import { useForm } from 'react-hook-form'
import { BodyShort } from '@navikt/ds-react'

import { QuestionId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { formQuestionTexts } from '@/domain/formValues'

import FormPanel from '../FormComponents/FormPanel'
import NestedRadioGroup from '../FormComponents/NestedRadioGroup'

const formPage = QuestionId.fremtidigSituasjon

function FremtidigSituasjon(): React.ReactElement {
  const { formState } = useMerOppfolgingFormContext()

  const methods = useForm({
    defaultValues: {
      [formPage]: formState[formPage],
    },
  })
  return (
    <FormPanel formPage={formPage} methods={methods}>
      <>
        <BodyShort spacing>For å vite hva slags oppfølging du trenger må du svare på noen spørsmål.</BodyShort>
        <NestedRadioGroup name={formPage} legend={formQuestionTexts[formPage]} />
      </>
    </FormPanel>
  )
}

export default FremtidigSituasjon
