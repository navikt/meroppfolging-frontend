import React, { ReactElement } from 'react'
import { BodyShort, Link, List } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { trpc } from '@/utils/trpc'
import { getLongDateFormat } from '@/utils/dateUtils'

export const BytteJobb = (): ReactElement => {
  const maxDate = trpc.maxDate.useQuery()
  const maxDateText =
    maxDate.isSuccess && maxDate.data.maxDate
      ? `Siste dag du kan motta sykepenger er beregnet til å være ${getLongDateFormat(maxDate.data.maxDate)}.`
      : 'Det nærmer seg siste dag du kan motta sykepenger.'

  return (
    <>
      <div>
        <BodyShort>Av og til fungerer man bedre i en annen jobb enn den man er sykmeldt fra.</BodyShort>
        <List>
          <List.Item>Er det vanskelig for deg å utføre oppgavene du hadde før du ble syk?</List.Item>
          <List.Item>
            Er det andre forhold hos arbeidsgiveren din som gjør det vanskelig for deg å fungere i jobben?
          </List.Item>
        </List>
        <BodyShort>
          {maxDateText} <b>Det er derfor lurt å tenke på jobbytte allerede nå.</b> Veilederen kan hjelpe deg med dette.
        </BodyShort>
      </div>

      <BodyShort>
        Du kan finne alle utlyste stillinger i landet på{' '}
        <Link href="https://arbeidsplassen.nav.no" target="_blank">
          arbeidsplassen.nav.no <ExternalLinkIcon title="åpner i ny fane" />
        </Link>
        .
      </BodyShort>

      <BodyShort>
        Hvis du blir arbeidsledig eller permittert kan du ha rett på{' '}
        <Link href="https://www.nav.no/dagpenger" target="_blank">
          dagpenger
          <ExternalLinkIcon title="åpner i ny fane" />
        </Link>
        . Merk at hvis du sier opp jobben og det det vurderes at du ikke hadde rimelig grunn, så mister du retten til
        dagpenger de første 18 ukene.
      </BodyShort>
    </>
  )
}
