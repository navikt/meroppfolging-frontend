import { pick } from 'remeda'

import { isSporsmalId } from '../../../utils/tsUtils'

import { defaultFormValues } from './formValues'

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
  const formArray = values.filter(isSporsmalId)
  return { ...defaultFormValues, ...pick(state, formArray) }
}
