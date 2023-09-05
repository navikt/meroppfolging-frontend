'use client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Summary from './Summary/Summary'
import FremtidigSituasjon from './Forms/FremtidigSituasjon'
import Utdanning from './Forms/Utdanning'
import TilbakeIArbeid from './Forms/TilbakeIArbeid'
import AndreForhold from './Forms/AndreForhold'
import UtdanningGodkjent from './Forms/UtdanningGodkjent'
import UtdanningBestatt from './Forms/UtdanningBestatt'
import SkalTilbakeIArbeid from './BackToWork/BackToWork'
import { getFormNavigation } from './formStateMachine'

import { FormPage, FormSummaryPages, MerOppfolgingFormState, QuestionId } from '@/types/merOppfolgingForm'
import useCurrentForm from '@/hooks/useCurrentForm'
import { INITIAL_FORM_PAGE } from '@/domain/formPages'
import { getFormUrlObject } from '@/utils/utils'
import { useMerOppfolgingFormContext } from '@/contexts/formContext'

function RenderForm({ currentForm }: { currentForm: FormPage }): React.ReactElement {
  switch (currentForm) {
    case QuestionId.fremtidigSituasjon:
      return <FremtidigSituasjon />
    case QuestionId.tilbakeIArbeid:
      return <TilbakeIArbeid />
    case QuestionId.utdanning:
      return <Utdanning />
    case QuestionId.utdanningGodkjent:
      return <UtdanningGodkjent />
    case QuestionId.utdanningBestatt:
      return <UtdanningBestatt />
    case QuestionId.andreForhold:
      return <AndreForhold />
    case FormSummaryPages.summary:
      return <Summary />
    case FormSummaryPages.backToWork:
      return <SkalTilbakeIArbeid />
  }
}

function validFormState(form: FormPage, state: MerOppfolgingFormState): boolean {
  const navigation = getFormNavigation(form, state)
  if (navigation.current === FormSummaryPages.backToWork && form === FormSummaryPages.summary) {
    return true
  }
  return form === navigation.current
}

function MerOppfolgingForm(): React.ReactElement {
  const { replace } = useRouter()
  const currentForm = useCurrentForm()
  const { formState } = useMerOppfolgingFormContext()

  const isValidFormPageParam = currentForm !== null
  const validFormPageParam = isValidFormPageParam ? currentForm : INITIAL_FORM_PAGE

  const isValidFormState = validFormState(validFormPageParam, formState)
  const formPage = isValidFormState ? validFormPageParam : INITIAL_FORM_PAGE

  useEffect(() => {
    if (!isValidFormPageParam || !isValidFormState) {
      replace(getFormUrlObject(INITIAL_FORM_PAGE), undefined, { shallow: true })
    }
  }, [isValidFormPageParam, isValidFormState, replace])

  return <RenderForm currentForm={formPage} />
}

export default MerOppfolgingForm
