import React from 'react'
import { useForm } from 'react-hook-form'

import NestedRadioGroup from '../FormComponents/NestedRadioGroup'
import FormPanel from '../FormComponents/FormPanel'

import { SporsmalId } from '@/types/merOppfolgingForm'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'

const questionTitle = 'Er utdanningen din bestått?'
const name = SporsmalId.utdanningBestatt

function UtdanningBestatt(): React.ReactElement {
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

export default UtdanningBestatt
