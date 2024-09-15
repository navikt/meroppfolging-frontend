import { ReactElement } from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'

import { FremtidigSituasjonAnswerTypes } from '@/pilot/domain/answerValues'
import { BytteJobbContent } from '../../Receipt/contents/BytteJobbReceipt'
import { TilbakeMedTilpasningerContent } from '../../Receipt/contents/TilbakeMedTilpasningerReceipt'
import { TilbakeGradertContent } from '../../Receipt/contents/TilbakeGradertReceipt'
import FortsattSykInformasjon from './FortsattSykInformasjon'

interface Props {
  fremtidigSituasjonAnswer: FremtidigSituasjonAnswerTypes
}

function Steg2Informasjon({ fremtidigSituasjonAnswer }: Props): ReactElement {
  const huskAKommeTilbakeText = (
    <BodyShort spacing>
      <em>Husk å komme tilbake hit dersom du åpner en lenke.</em>
    </BodyShort>
  )

  const merInformasjonEtterNesteSporsmalText = (
    <BodyShort spacing className="mt-6">
      Du får informasjon for andre situasjoner etter at du har svart på neste spørsmål.
    </BodyShort>
  )

  const tilbakeHosArbeidsgiverInformasjon = (
    <>
      <BodyShort spacing>Så bra at du er frisk og tilbake hos arbeidsgiver, eller tror at du er det snart.</BodyShort>
      {merInformasjonEtterNesteSporsmalText}
    </>
  )

  const trengerTilretteleggingInformasjon = (
    <>
      <Heading size="medium" level="2" spacing>
        Når du trenger tilrettelegging på arbeidsplassen
      </Heading>

      <TilbakeMedTilpasningerContent />
      {merInformasjonEtterNesteSporsmalText}
    </>
  )

  const tilbakeGradertInformasjon = (
    <>
      <Heading size="medium" level="2" spacing>
        Når du skal jobbe i redusert stillingsprosent
      </Heading>

      {huskAKommeTilbakeText}
      <TilbakeGradertContent />
      {merInformasjonEtterNesteSporsmalText}
    </>
  )

  const bytteJobbInformasjon = (
    <>
      <Heading size="medium" level="2" spacing>
        Når du skal bytte jobb
      </Heading>

      {huskAKommeTilbakeText}
      <BytteJobbContent />
      {merInformasjonEtterNesteSporsmalText}
    </>
  )

  const forSykInformasjon = (
    <>
      <Heading size="medium" level="2" spacing>
        Når du er for syk til å jobbe
      </Heading>

      {huskAKommeTilbakeText}
      <FortsattSykInformasjon />
      {merInformasjonEtterNesteSporsmalText}
    </>
  )

  const erUsikkerInformasjon = (
    <>
      <Heading size="medium" level="2" spacing>
        Hvis du fortsatt er for syk til å jobbe
      </Heading>

      {huskAKommeTilbakeText}
      <FortsattSykInformasjon />
      {merInformasjonEtterNesteSporsmalText}
    </>
  )

  switch (fremtidigSituasjonAnswer) {
    case 'TILBAKE_HOS_ARBEIDSGIVER':
      return tilbakeHosArbeidsgiverInformasjon
    case 'TILBAKE_MED_TILPASNINGER':
      return trengerTilretteleggingInformasjon
    case 'TILBAKE_GRADERT':
      return tilbakeGradertInformasjon
    case 'BYTTE_JOBB':
      return bytteJobbInformasjon
    case 'FORTSATT_SYK':
      return forSykInformasjon
    case 'USIKKER':
      return erUsikkerInformasjon
    default:
      return <div />
  }
}

export default Steg2Informasjon
