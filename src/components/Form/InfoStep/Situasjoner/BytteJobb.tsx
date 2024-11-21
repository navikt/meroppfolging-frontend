import React, { ReactElement } from 'react'
import { BodyShort, Link, List } from '@navikt/ds-react'
import NextLink from 'next/link'

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
      <BodyShort>
        Du kan finne alle utlyste stillinger i landet på{' '}
        <Link as={NextLink} href="https://arbeidsplassen.nav.no">
          arbeidsplassen.nav.no
        </Link>
        .
      </BodyShort>
    </>
  )
}
