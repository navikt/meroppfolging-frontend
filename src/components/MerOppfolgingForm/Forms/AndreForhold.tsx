import { Alert } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'

import NestedRadioGroup from '../FormComponents/NestedRadioGroup'
import FormPanel from '../FormComponents/FormPanel'

import { QuestionId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'

const questionTitle = 'Er det noe annet enn helsen din som NAV bør ta hensyn til?'
const questionDescription = 'For eksempel språk, lesing og skriving eller familiesituasjon'
const name = QuestionId.andreForhold

function AndreForhold(): React.ReactElement {
  const { formState } = useMerOppfolgingFormContext()

  const methods = useForm({
    defaultValues: {
      [name]: formState[name],
    },
  })

  return (
    <FormPanel title="Andre utfordringer knyttet til arbeid" methods={methods}>
      <>
        <NestedRadioGroup name={name} legend={questionTitle} description={questionDescription} />
        <Alert variant="info">Svarer du ja, kan du fortelle mer til NAV-veilederen som tar kontakt med deg.</Alert>
      </>
    </FormPanel>
  )
}

export default AndreForhold
