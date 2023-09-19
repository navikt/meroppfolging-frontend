import { describe, it, expect } from 'vitest'

import { getFormNavigation } from '../formStateMachine'

import {
  emptyMerOppfolgingFormState,
  filledMerOppfolgingFormState,
  partiallyFilledMerOppfolgingFormState,
} from '@/mocks/data/fixtures/merOppfolgingForm'
import { INITIAL_FORM_PAGE } from '@/domain/formPages'
import { QuestionId } from '@/types/merOppfolgingForm'

const initalFormNavigation = {
  current: 'fremtidigSituasjon',
  next: null,
  previous: null,
  history: ['fremtidigSituasjon'],
}

describe('formStateMachine', () => {
  describe('getFormNavigation with', () => {
    it('empty form state should return inital form navigation', () => {
      const formNav = getFormNavigation(INITIAL_FORM_PAGE, emptyMerOppfolgingFormState)

      expect(formNav).toMatchObject(initalFormNavigation)
    })

    it('empty form state and not initial form page should return inital form navigation', () => {
      const formNav = getFormNavigation(QuestionId.utdanning, emptyMerOppfolgingFormState)

      expect(formNav).toMatchObject(initalFormNavigation)
    })

    it('partially filled form state and form page of history tree should return received form navigation', () => {
      const formNav = getFormNavigation(QuestionId.fremtidigSituasjon, partiallyFilledMerOppfolgingFormState)

      expect(formNav).toMatchObject({
        current: 'fremtidigSituasjon',
        next: 'tilbakeIArbeid',
        previous: null,
        history: ['fremtidigSituasjon'],
      })
    })

    it('partially filled form state and last filled form page should return received form navigation', () => {
      const formNav = getFormNavigation(QuestionId.tilbakeIArbeid, partiallyFilledMerOppfolgingFormState)

      expect(formNav).toMatchObject({
        current: 'tilbakeIArbeid',
        next: null,
        previous: 'fremtidigSituasjon',
        history: ['fremtidigSituasjon', 'tilbakeIArbeid'],
      })
    })

    it('filled form state and last form page of history tree should return received form navigation', () => {
      const formNav = getFormNavigation(QuestionId.tilbakeIArbeid, filledMerOppfolgingFormState)

      expect(formNav).toMatchObject({
        current: 'tilbakeIArbeid',
        next: 'backToWork',
        previous: 'fremtidigSituasjon',
        history: ['fremtidigSituasjon', 'tilbakeIArbeid'],
      })
    })

    it('filled form state and form page of history tree should return received form navigation', () => {
      const formNav = getFormNavigation(QuestionId.fremtidigSituasjon, filledMerOppfolgingFormState)

      expect(formNav).toMatchObject({
        current: 'fremtidigSituasjon',
        next: 'tilbakeIArbeid',
        previous: null,
        history: ['fremtidigSituasjon'],
      })
    })

    it('filled form state and form page not part of history tree should return inital form navigation', () => {
      const formNav = getFormNavigation(QuestionId.utdanning, filledMerOppfolgingFormState)

      expect(formNav).toMatchObject(initalFormNavigation)
    })
  })
})
