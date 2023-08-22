import { useForm } from 'react-hook-form'

import NestedRadioGroup from '../FormComponents/NestedRadioGroup'
import FormPanel from '../FormComponents/FormPanel'

import { SporsmalId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'

const questionTitle = 'Hva tenker du om din fremtidige situasjon?'
const name = SporsmalId.fremtidigSituasjon

function FremtidigSituasjon(): React.ReactElement {
  const { formState } = useMerOppfolgingFormContext()

  const methods = useForm({
    defaultValues: {
      [name]: formState[name],
    },
  })
  return (
    <FormPanel title="Arbeidssituasjon" methods={methods}>
      <NestedRadioGroup name={name} legend={questionTitle} />
    </FormPanel>
  )
}

export default FremtidigSituasjon
