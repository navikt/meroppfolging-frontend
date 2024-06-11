import { ReactElement } from 'react'
import { Heading, Link } from '@navikt/ds-react'

function UsefulLinks(): ReactElement {
  return (
    <>
      <Heading size="medium">Nyttige lenker</Heading>
      <Link href="https://www.nav.no/syk-lenge">Har vært syk eller skadet lenge</Link>
      <Link href="https://www.nav.no/aap">Arbeidsavklaringspenger (AAP)</Link>
      <Link href="https://www.nav.no/arbeidsgiver/kompetansetiltak-sykmeldte">Kompetansetiltak for sykmeldte</Link>
      <Link href="https://www.nav.no/friskmelding-arbeidsformidling">Friskmelding til arbeidsformidling </Link>
    </>
  )
}

export default UsefulLinks
