import { Alert } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'

import NestedRadioGroup from '../FormComponents/NestedRadioGroup'
import FormPanel from '../FormComponents/FormPanel'

import { QuestionId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { formQuestionTexts } from '@/domain/formValues'

const questionDescription = 'For eksempel språk, lesing og skriving eller familiesituasjon'
const formPage = QuestionId.andreForhold

function AndreForhold(): React.ReactElement {
  const { formState } = useMerOppfolgingFormContext()

  const methods = useForm({
    defaultValues: {
      [formPage]: formState[formPage],
    },
  })

  return (
    <FormPanel formPage={formPage} methods={methods}>
      <>
        <NestedRadioGroup name={formPage} legend={formQuestionTexts[formPage]} description={questionDescription} />
        <Alert variant="info">Svarer du ja, kan du fortelle mer til NAV-veilederen som tar kontakt med deg.</Alert>
      </>
    </FormPanel>
  )
}

export default AndreForhold
