import { Button, Heading, Panel } from '@navikt/ds-react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useRouter } from 'next/router'
import { equals, pick } from 'remeda'

import { getFormNavigation } from '../utils/formStateMachine'
import { getFormUrlObject } from '../utils/utils'
import { isSporsmalId } from '../../../utils/tsUtils'

import FormBack from './FormBack'

// import { RHFDevTool } from '@/libs/ReactHookFormsDevTools'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { MerOppfolgingFormState } from '@/types/merOppfolgingForm'

function hasFormValuesChanged(subForm: Partial<MerOppfolgingFormState>, form: MerOppfolgingFormState): boolean {
  return !equals(pick(form, Object.keys(subForm).filter(isSporsmalId)), form)
}

function FormPanel<T extends Partial<MerOppfolgingFormState>>({
  title,
  methods,
  children,
}: {
  title: string
  methods: UseFormReturn<T>
  children: React.ReactElement
}): React.ReactElement {
  const router = useRouter()
  const { currentForm, history, formState, formDispatch, previousForm } = useMerOppfolgingFormContext()

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          if (hasFormValuesChanged(data, formState)) {
            formDispatch({ type: 'updateForm', value: data, history: history })
          }

          const { next } = getFormNavigation(currentForm, { ...formState, ...data }).currentForm
          if (next !== null) {
            router.push(getFormUrlObject(next))
          }
        })}
      >
        <FormBack formPage={previousForm} />

        <Panel className="bg-gray-100">
          {title && (
            <Heading size="medium" spacing level="1">
              {title}
            </Heading>
          )}

          {children}
        </Panel>

        <Button>Neste</Button>
        {/* <RHFDevTool control={methods.control} /> */}
      </form>
    </FormProvider>
  )
}

export default FormPanel
