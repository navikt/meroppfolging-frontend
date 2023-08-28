import { useForm } from 'react-hook-form'

import NestedRadioGroup from '../FormComponents/NestedRadioGroup'
import FormPanel from '../FormComponents/FormPanel'

import { QuestionId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { formQuestionTexts } from '@/domain/formValues'

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
      <NestedRadioGroup name={formPage} legend={formQuestionTexts[formPage]} />
    </FormPanel>
  )
}

export default FremtidigSituasjon
