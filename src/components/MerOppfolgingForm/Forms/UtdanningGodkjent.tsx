import { useForm } from 'react-hook-form'

import { QuestionId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { formQuestionTexts } from '@/domain/formValues'

import NestedRadioGroup from '../FormComponents/NestedRadioGroup'
import FormPanel from '../FormComponents/FormPanel'

const formPage = QuestionId.utdanningGodkjent

function UtdanningGodkjent(): React.ReactElement {
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

export default UtdanningGodkjent
