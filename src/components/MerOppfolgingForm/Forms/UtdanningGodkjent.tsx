import { useForm } from 'react-hook-form'

import FormPanel from '../FormComponents/FormPanel'
import NestedRadioGroup from '../FormComponents/NestedRadioGroup'

import { QuestionId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { formQuestionTexts } from '@/domain/formValues'

const name = QuestionId.utdanningGodkjent

function UtdanningGodkjent(): React.ReactElement {
  const { formState } = useMerOppfolgingFormContext()

  const methods = useForm({
    defaultValues: {
      [name]: formState[name],
    },
  })

  return (
    <FormPanel title="Utdanning" methods={methods}>
      <NestedRadioGroup name={name} legend={formQuestionTexts[name]} />
    </FormPanel>
  )
}

export default UtdanningGodkjent
