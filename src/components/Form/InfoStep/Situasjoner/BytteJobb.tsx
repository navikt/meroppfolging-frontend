import React, { ReactElement } from 'react'
import { BodyShort, List } from '@navikt/ds-react'

import { TrackedExternalLink } from '@/components/Link/TrackedExternalLink'

export const BytteJobb = (): ReactElement => {
  return (
    <>
      <List className="[&_ul]:mt-0 [&_ul]:mb-0">
        <List.Item>Er det vanskelig for deg å utføre oppgavene du hadde før du ble syk?</List.Item>
        <List.Item>
          Er det andre forhold hos arbeidsgiveren din som gjør det vanskelig for deg å fungere i jobben?
        </List.Item>
      </List>

      <BodyShort>
        Av og til fungerer man bedre i en annen jobb enn den man er sykmeldt fra. Det nærmer seg slutten på sykepengene
        dine, og derfor kan det være lurt å tenke på å bytte jobb allerede nå.
      </BodyShort>

      <BodyShort>
        Hvis du blir arbeidsledig eller permittert kan du ha rett på{' '}
        <TrackedExternalLink href="https://www.nav.no/dagpenger">dagpenger</TrackedExternalLink>
        {'. '} Merk at hvis du sier opp jobben og det det vurderes at du ikke hadde rimelig grunn, så mister du retten
        til dagpenger de første 18 ukene.
      </BodyShort>
    </>
  )
}
