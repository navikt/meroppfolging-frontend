import ErrorPage from 'next/error'

import FremtidigSituasjon from './SubForms/FremtidigSituasjon'
import Utdanning from './SubForms/Utdanning'
import TilbakeIArbeid from './SubForms/TilbakeIArbeid'
import AndreForhold from './SubForms/AndreForhold'
import UtdanningGodkjent from './SubForms/UtdanningGodkjent'
import UtdanningBestatt from './SubForms/UtdanningBestatt'
import Oppsummering from './Oppsummering'
import SkalTilbakeIArbeid from './SkalTilbakeIArbeid'

import { FormPage, SporsmalId } from '@/types/merOppfolgingForm'
import useCurrentForm from '@/hooks/useCurrentForm'

function RenderPage({ currentForm }: { currentForm: FormPage }): React.ReactElement {
  switch (currentForm) {
    case SporsmalId.fremtidigSituasjon:
      return <FremtidigSituasjon />
    case SporsmalId.tilbakeIArbeid:
      return <TilbakeIArbeid />
    case SporsmalId.utdanning:
      return <Utdanning />
    case SporsmalId.utdanningGodkjent:
      return <UtdanningGodkjent />
    case SporsmalId.utdanningBestatt:
      return <UtdanningBestatt />
    case SporsmalId.andreForhold:
      return <AndreForhold />
    case 'Oppsummering':
      return <Oppsummering />
    case 'SkalTilbakeIArbeid':
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
