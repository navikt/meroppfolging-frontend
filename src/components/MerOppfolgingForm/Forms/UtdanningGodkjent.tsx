import { useForm } from 'react-hook-form'

import FormPanel from '../FormComponents/FormPanel'
import NestedRadioGroup from '../FormComponents/NestedRadioGroup'

import { QuestionId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { formQuestionTexts } from '@/domain/formValues'

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
