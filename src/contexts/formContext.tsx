import React, { PropsWithChildren, ReactNode, createContext, useContext, useReducer } from 'react'

import { defaultFormValues } from '@/domain/formValues'
import { FormAction, formReducer } from '@/components/MerOppfolgingForm/formReducer'
import { MerOppfolgingFormState } from '@/types/merOppfolgingForm'

type FormContext = {
  formState: MerOppfolgingFormState
  formDispatch: React.Dispatch<FormAction>
}

const MerOppfolgingFormContext = createContext<FormContext>({
  formState: defaultFormValues,
  formDispatch: () => {
    return
  },
})

export function useMerOppfolgingFormContext(): FormContext {
  return useContext(MerOppfolgingFormContext)
}

export function MerOppfolgingFormProvider({ children }: PropsWithChildren): ReactNode {
  const createInitialState = (state: MerOppfolgingFormState): MerOppfolgingFormState => state
  const [formState, formDispatch] = useReducer(formReducer, defaultFormValues, createInitialState)

  return (
    <MerOppfolgingFormContext.Provider
      value={{
        formState,
        formDispatch,
      }}
    >
      {children}
    </MerOppfolgingFormContext.Provider>
  )
}
