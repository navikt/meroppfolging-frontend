import { useForm } from 'react-hook-form'

import NestedRadioGroup from '../FormComponents/NestedRadioGroup'
import FormPanel from '../FormComponents/FormPanel'

import { QuestionId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'

const questionTitle = 'Hva er din høyeste fullførte utdanning?'
const name = QuestionId.utdanning

function Utdanning(): React.ReactElement {
  const { formState } = useMerOppfolgingFormContext()

  const methods = useForm({
    defaultValues: {
      [name]: formState[name],
    },
  })

  return (
    <FormPanel title="Utdanning" methods={methods}>
      <NestedRadioGroup name={name} legend={questionTitle} />
    </FormPanel>
  )
}

export default Utdanning
