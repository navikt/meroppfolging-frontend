import { INITIAL_FORM_PAGE } from '@/domain/formPages'
import {
  FormPage,
  FormSummaryPages,
  MerOppfolgingForm,
  MerOppfolgingFormState,
  QuestionId,
} from '@/types/merOppfolgingForm'
import {
  FremtidigSituasjonValues,
  TilbakeIArbeidValues,
  UtdanningBestattValues,
  UtdanningGodkjentValues,
  UtdanningValues,
} from '@/domain/radioValues'
import { isQuestionId } from '@/utils/tsUtils'

function createNavigationState(state: MerOppfolgingFormState) {
  return (form: keyof MerOppfolgingFormState) => {
    switch (form) {
      case QuestionId.fremtidigSituasjon: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
      case QuestionId.tilbakeIArbeid: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
      case QuestionId.utdanning: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
      case QuestionId.utdanningGodkjent: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
      case QuestionId.utdanningBestatt: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
      case QuestionId.andreForhold: {
        const value = state[form]
        return value ? nextNavigationMap[form][value] : null
      }
    }
  }
}

export const nextNavigationMap = {
  [QuestionId.fremtidigSituasjon]: {
    [FremtidigSituasjonValues.SAMME_ARBEIDSGIVER]: QuestionId.tilbakeIArbeid,
    [FremtidigSituasjonValues.SAMME_ARBEIDSGIVER_NY_STILLING]: QuestionId.tilbakeIArbeid,
    [FremtidigSituasjonValues.NY_ARBEIDSGIVER]: QuestionId.utdanning,
    [FremtidigSituasjonValues.USIKKER]: QuestionId.utdanning,
    [FremtidigSituasjonValues.INGEN_PASSER]: FormSummaryPages.summary,
  },
  [QuestionId.tilbakeIArbeid]: {
    [TilbakeIArbeidValues.JA_FULL_STILLING]: FormSummaryPages.backToWork,
    [TilbakeIArbeidValues.JA_REDUSERT_STILLING]: FormSummaryPages.summary,
    [TilbakeIArbeidValues.NEI]: FormSummaryPages.summary,
    [TilbakeIArbeidValues.USIKKER]: FormSummaryPages.summary,
  },
  [QuestionId.utdanning]: {
    [UtdanningValues.INGEN_UTDANNING]: QuestionId.andreForhold,
    [UtdanningValues.GRUNNSKOLE]: QuestionId.utdanningGodkjent,
    [UtdanningValues.VIDEREGAENDE_GRUNNUTDANNING]: QuestionId.utdanningGodkjent,
    [UtdanningValues.VIDEREGAENDE_FAGBREV_SVENNEBREV]: QuestionId.utdanningGodkjent,
    [UtdanningValues.HOYERE_UTDANNING_1_TIL_4]: QuestionId.utdanningGodkjent,
    [UtdanningValues.HOYERE_UTDANNING_5_ELLER_MER]: QuestionId.utdanningGodkjent,
  },
  [QuestionId.utdanningGodkjent]: {
    [UtdanningGodkjentValues.JA]: QuestionId.utdanningBestatt,
    [UtdanningGodkjentValues.NEI]: QuestionId.utdanningBestatt,
    [UtdanningGodkjentValues.VET_IKKE]: QuestionId.utdanningBestatt,
  },
  [QuestionId.utdanningBestatt]: {
    [UtdanningBestattValues.JA]: QuestionId.andreForhold,
    [UtdanningBestattValues.NEI]: QuestionId.andreForhold,
  },
  [QuestionId.andreForhold]: {
    [UtdanningBestattValues.JA]: FormSummaryPages.summary,
    [UtdanningBestattValues.NEI]: FormSummaryPages.summary,
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
    if (formNav.currentForm.name === currentForm || !formNav.currentForm.next) {
      return formNav
    }

    const next = formNav.currentForm.next
    const nextFormPage = isQuestionId(next) ? navState(next) : null
    const newFormNav = {
      currentForm: {
        name: next,
        previous: formNav.currentForm.name,
        next: nextFormPage,
      },
      history: [...formNav.history, formNav.currentForm.next],
    }
    return getHistory(newFormNav)
  }

  const formNav = getHistory(initalNav)

  return formNav
}
