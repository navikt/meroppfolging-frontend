import { useForm } from 'react-hook-form'

import FormPanel from '../FormComponents/FormPanel'
import NestedRadioGroup from '../FormComponents/NestedRadioGroup'

import { SporsmalId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'

const questionTitle = 'Er utdanningen din godkjent i Norge?'
const name = SporsmalId.utdanningGodkjent

function UtdanningGodkjent(): React.ReactElement {
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

export default UtdanningGodkjent
