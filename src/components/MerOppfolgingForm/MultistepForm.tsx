import ErrorPage from 'next/error'

import Summary from '../Summary/Summary'

import FremtidigSituasjon from './Forms/FremtidigSituasjon'
import Utdanning from './Forms/Utdanning'
import TilbakeIArbeid from './Forms/TilbakeIArbeid'
import AndreForhold from './Forms/AndreForhold'
import UtdanningGodkjent from './Forms/UtdanningGodkjent'
import UtdanningBestatt from './Forms/UtdanningBestatt'
import SkalTilbakeIArbeid from './BackToWork'

import { FormPage, FormSummaryPages, QuestionId } from '@/types/merOppfolgingForm'
import useCurrentForm from '@/hooks/useCurrentForm'

function RenderPage({ currentForm }: { currentForm: FormPage }): React.ReactElement {
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

function MultistepForm(): React.ReactElement {
  const currentForm = useCurrentForm()

  if (currentForm) {
    return <RenderPage currentForm={currentForm} />
  } else return <ErrorPage statusCode={404} />
}

export default MultistepForm
