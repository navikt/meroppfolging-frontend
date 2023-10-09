import { Button, Heading, Panel } from '@navikt/ds-react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useRouter } from 'next/router'
import { equals, pick } from 'remeda'

import { getFormNavigation } from '../formStateMachine'

import FormBackLink from './FormBackLink'
import FormCancelLink from './FormCancelButton'

import { getFormUrlObject } from '@/utils/utils'
import { isQuestionId } from '@/utils/tsUtils'
// import { RHFDevTool } from '@/libs/ReactHookFormsDevTools'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { MerOppfolgingFormState, QuestionId } from '@/types/merOppfolgingForm'
import { formQuestionTitles } from '@/domain/formValues'
import { Column } from '@/components/Containers/column'
import { logAmplitudeEvent, useLogAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { FORM_NAME } from '@/domain/formPages'

function hasFormValuesChanged(subForm: Partial<MerOppfolgingFormState>, form: MerOppfolgingFormState): boolean {
  return !equals(pick(form, Object.keys(subForm).filter(isQuestionId)), subForm)
}

function logAmplitudeEventOnNext(formPage: QuestionId, formState: Partial<MerOppfolgingFormState>): void {
  logAmplitudeEvent({ eventName: 'skjema steg fullført', data: { skjemanavn: FORM_NAME, steg: formPage } })
  logAmplitudeEvent({
    eventName: 'skjema steg spørsmål besvart',
    data: {
      skjemanavn: FORM_NAME,
      steg: formPage,
      spørsmål: Object.keys(formState).toString(),
      svar: Object.values(formState).toString(),
    },
  })
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

  useLogAmplitudeEvent({ eventName: 'skjema steg startet', data: { skjemanavn: FORM_NAME, steg: formPage } })

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((value) => {
          if (hasFormValuesChanged(value, formState)) {
            formDispatch({ type: 'updateForm', value, history })
          }

          const { next } = getFormNavigation(formPage, { ...formState, ...value })
          if (next !== null) {
            logAmplitudeEventOnNext(formPage, value)
            router.push(getFormUrlObject(next))
          } else {
            throw new Error('Missing next form. Should not happen.')
          }
        })}
      >
        <FormBackLink formPage={previous} />

        <Column>
          <Panel className="bg-bg-subtle border-border-default">
            <Heading size="medium" spacing level="1">
              {formQuestionTitles[formPage]}
            </Heading>

            {children}
          </Panel>

          <Button className="w-fit">Neste</Button>
          <FormCancelLink />
        </Column>
        {/* <RHFDevTool control={methods.control} /> */}
      </form>
    </FormProvider>
  )
}

export default FormPanel
