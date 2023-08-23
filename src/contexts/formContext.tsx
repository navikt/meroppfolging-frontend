import React, { createContext, useContext, useReducer } from 'react'

import { defaultFormValues } from '@/domain/formValues'
import { INITIAL_FORM_PAGE } from '@/domain/formPages'
import { FormAction, formReducer } from '@/components/MerOppfolgingForm/formReducer'
import { FormPage, MerOppfolgingFormState } from '@/types/merOppfolgingForm'
import useCurrentForm from '@/hooks/useCurrentForm'
import { getFormNavigation } from '@/components/MerOppfolgingForm/formStateMachine'

type FormContext = {
  formState: MerOppfolgingFormState
  formDispatch: React.Dispatch<FormAction>
  currentForm: FormPage
  previousForm: FormPage | null
  history: FormPage[]
}

const MerOppfolgingFormContext = createContext<FormContext>({
  formState: defaultFormValues,
  formDispatch: () => {
    return
  },
  currentForm: INITIAL_FORM_PAGE,
  previousForm: null,
  history: [],
})

export function useMerOppfolgingFormContext(): FormContext {
  return useContext(MerOppfolgingFormContext)
}

export function MerOppfolgingFormProvider({ children }: { children?: React.ReactElement }): React.ReactElement {
  const createInitialState = (state: MerOppfolgingFormState): MerOppfolgingFormState => state
  const [formState, formDispatch] = useReducer(formReducer, defaultFormValues, createInitialState)
  const currentForm = useCurrentForm()
  const navigation = getFormNavigation(currentForm, formState)

  return (
    <MerOppfolgingFormContext.Provider
      value={{
        formState,
        formDispatch,
        currentForm,
        previousForm: navigation.currentForm.previous,
        history: navigation.history,
      }}
    >
      {children}
    </MerOppfolgingFormContext.Provider>
  )
}
