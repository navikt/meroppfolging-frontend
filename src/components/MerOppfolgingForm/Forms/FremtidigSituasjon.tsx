import { useForm } from 'react-hook-form'

import NestedRadioGroup from '../FormComponents/NestedRadioGroup'
import FormPanel from '../FormComponents/FormPanel'

import { QuestionId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { formQuestionTexts } from '@/domain/formValues'

const name = QuestionId.fremtidigSituasjon

function FremtidigSituasjon(): React.ReactElement {
  const { formState } = useMerOppfolgingFormContext()

  const methods = useForm({
    defaultValues: {
      [name]: formState[name],
    },
  })
  return (
    <FormPanel title="Arbeidssituasjon" methods={methods}>
      <NestedRadioGroup name={name} legend={formQuestionTexts[name]} />
    </FormPanel>
  )
}

export default FremtidigSituasjon
