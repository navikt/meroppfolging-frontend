import { pick } from 'remeda'

import { isQuestionId } from '../../utils/tsUtils'
import { defaultFormValues } from '../../domain/formValues'

import { FormPage, MerOppfolgingFormState } from '@/types/merOppfolgingForm'

export type FormAction =
  | { type: 'updateForm'; value: Partial<MerOppfolgingFormState>; history: FormPage[] }
  | { type: 'submitForm' }

export function formReducer(state: MerOppfolgingFormState, action: FormAction): MerOppfolgingFormState {
  switch (action.type) {
    case 'updateForm':
      const newState = pickValues(action.history, state)
      return { ...newState, ...action.value }
    case 'submitForm':
      return state
  }
}

function pickValues(values: FormPage[], state: MerOppfolgingFormState): MerOppfolgingFormState {
  const formArray = values.filter(isQuestionId)
  return { ...defaultFormValues, ...pick(state, formArray) }
}
