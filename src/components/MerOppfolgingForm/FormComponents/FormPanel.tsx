import { Button, Heading, Panel } from '@navikt/ds-react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useRouter } from 'next/router'
import { equals, pick } from 'remeda'

import { getFormNavigation } from '../formStateMachine'

import FormBack from './FormBack'

import { getFormUrlObject } from '@/utils/utils'
import { isQuestionId } from '@/utils/tsUtils'
// import { RHFDevTool } from '@/libs/ReactHookFormsDevTools'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { MerOppfolgingFormState, QuestionId } from '@/types/merOppfolgingForm'
import { formQuestionTitles } from '@/domain/formValues'
import { Column } from '@/components/Containers/column'

function hasFormValuesChanged(subForm: Partial<MerOppfolgingFormState>, form: MerOppfolgingFormState): boolean {
  return !equals(pick(form, Object.keys(subForm).filter(isQuestionId)), subForm)
}

function FormPanel<T extends Partial<MerOppfolgingFormState>>({
  formPage,
  methods,
  children,
}: {
  formPage: QuestionId
  methods: UseFormReturn<T>
  children: React.ReactElement
}): React.ReactElement {
  const router = useRouter()
  const { formState, formDispatch } = useMerOppfolgingFormContext()
  const { previous, history } = getFormNavigation(formPage, formState)

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((value) => {
          if (hasFormValuesChanged(value, formState)) {
            formDispatch({ type: 'updateForm', value, history })
          }

          const { next } = getFormNavigation(formPage, { ...formState, ...value })
          if (next !== null) {
            router.push(getFormUrlObject(next))
          } else {
            throw new Error('Missing next form. Should not happen.')
          }
        })}
      >
        <FormBack formPage={previous} />

        <Column>
          <Panel className="bg-gray-100">
            <Heading size="medium" spacing level="1">
              {formQuestionTitles[formPage]}
            </Heading>

            {children}
          </Panel>

          <Button>Neste</Button>
        </Column>
        {/* <RHFDevTool control={methods.control} /> */}
      </form>
    </FormProvider>
  )
}

export default FormPanel
