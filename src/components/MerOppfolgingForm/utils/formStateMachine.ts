import { INITIAL_FORM_PAGE } from './formValues'

import {
  FormPage,
  FremtidigSituasjonValues,
  MerOppfolgingForm,
  MerOppfolgingFormState,
  SporsmalId,
  TilbakeIArbeidValues,
  UtdanningBestattValues,
  UtdanningGodkjentValues,
  UtdanningValues,
} from '@/types/merOppfolgingForm'

function createNavigationState(state: MerOppfolgingFormState) {
  return (form: keyof MerOppfolgingFormState) => {
    switch (form) {
      case SporsmalId.fremtidigSituasjon: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
      case SporsmalId.tilbakeIArbeid: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
      case SporsmalId.utdanning: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
      case SporsmalId.utdanningGodkjent: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
      case SporsmalId.utdanningBestatt: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
      case SporsmalId.andreForhold: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
    }
  }
}

export const nextNavigationMap = {
  [SporsmalId.fremtidigSituasjon]: {
    [FremtidigSituasjonValues.SAMME_ARBEIDSGIVER]: SporsmalId.tilbakeIArbeid,
    [FremtidigSituasjonValues.SAMME_ARBEIDSGIVER_NY_STILLING]: SporsmalId.tilbakeIArbeid,
    [FremtidigSituasjonValues.NY_ARBEIDSGIVER]: SporsmalId.utdanning,
    [FremtidigSituasjonValues.USIKKER]: SporsmalId.utdanning,
    [FremtidigSituasjonValues.INGEN_PASSER]: 'Oppsummering',
  },
  [SporsmalId.tilbakeIArbeid]: {
    [TilbakeIArbeidValues.JA_FULL_STILLING]: 'SkalTilbakeIArbeid',
    [TilbakeIArbeidValues.JA_REDUSERT_STILLING]: 'Oppsummering',
    [TilbakeIArbeidValues.NEI]: 'Oppsummering',
    [TilbakeIArbeidValues.USIKKER]: 'Oppsummering',
  },
  [SporsmalId.utdanning]: {
    [UtdanningValues.INGEN_UTDANNING]: SporsmalId.andreForhold,
    [UtdanningValues.GRUNNSKOLE]: SporsmalId.utdanningGodkjent,
    [UtdanningValues.VIDEREGAENDE_GRUNNUTDANNING]: SporsmalId.utdanningGodkjent,
    [UtdanningValues.VIDEREGAENDE_FAGBREV_SVENNEBREV]: SporsmalId.utdanningGodkjent,
    [UtdanningValues.HOYERE_UTDANNING_1_TIL_4]: SporsmalId.utdanningGodkjent,
    [UtdanningValues.HOYERE_UTDANNING_5_ELLER_MER]: SporsmalId.utdanningGodkjent,
  },
  [SporsmalId.utdanningGodkjent]: {
    [UtdanningGodkjentValues.JA]: SporsmalId.utdanningBestatt,
    [UtdanningGodkjentValues.NEI]: SporsmalId.utdanningBestatt,
    [UtdanningGodkjentValues.VET_IKKE]: SporsmalId.utdanningBestatt,
  },
  [SporsmalId.utdanningBestatt]: {
    [UtdanningBestattValues.JA]: SporsmalId.andreForhold,
    [UtdanningBestattValues.NEI]: SporsmalId.andreForhold,
  },
  [SporsmalId.andreForhold]: {
    [UtdanningBestattValues.JA]: 'Oppsummering',
    [UtdanningBestattValues.NEI]: 'Oppsummering',
  },
} as const satisfies {
  [K in keyof MerOppfolgingForm]: { [NK in MerOppfolgingForm[K]]: FormPage }
}

export type FormNavigation = {
  currentForm: { name: FormPage; previous: FormPage | null; next: FormPage | null }
  history: FormPage[]
}

export function getFormNavigation(currentForm: FormPage, form: MerOppfolgingFormState): FormNavigation {
  const navState = createNavigationState(form)

  const initalNav: FormNavigation = {
    currentForm: { name: INITIAL_FORM_PAGE, previous: null, next: navState(INITIAL_FORM_PAGE) },
    history: [INITIAL_FORM_PAGE],
  }

  function getHistory(formNav: FormNavigation): FormNavigation {
    if (
      formNav.currentForm.name === currentForm ||
      !formNav.currentForm.next ||
      formNav.currentForm.next === 'Oppsummering' ||
      formNav.currentForm.next === 'SkalTilbakeIArbeid'
    ) {
      return formNav
    }
    const newFormNav = {
      currentForm: {
        name: formNav.currentForm.next,
        previous: formNav.currentForm.name,
        next: navState(formNav.currentForm.next),
      },
      history: [...formNav.history, formNav.currentForm.next],
    }
    return getHistory(newFormNav)
  }

  const formNav = getHistory(initalNav)

  return formNav
}
