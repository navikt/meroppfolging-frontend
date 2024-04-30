import Link from 'next/link'
import { Table } from '@navikt/ds-react'

import { MerOppfolgingFormState } from '@/types/merOppfolgingForm'
import { summaryTexts } from '@/components/MerOppfolgingForm/Summary/summaryTexts'
import { isQuestionId } from '@/utils/tsUtils'
import { createFormValueState } from '@/domain/formValues'
import { getFormUrl } from '@/utils/utils'

function SummaryTable({ state }: { state: MerOppfolgingFormState }): React.ReactElement {
  const formValueState = createFormValueState(state)

  const keysWithValue = Object.keys(state)
    .filter(isQuestionId)
    .filter((key) => !!state[key])

  const Rows = keysWithValue.map((key) => {
    return (
      <Table.Row key={key}>
        <Table.HeaderCell scope="row">{summaryTexts[key]}</Table.HeaderCell>
        <Table.DataCell>{formValueState(key)}</Table.DataCell>
        <Table.DataCell>
          <Link href={getFormUrl(key)} aria-label={`Endre svaret på ${summaryTexts[key]}`} className="navds-link">
            Endre svaret
          </Link>
        </Table.DataCell>
      </Table.Row>
    )
  })

  return (
    <Table aria-label="Sammendrag av svar">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">Overskrift på spørsmål</Table.HeaderCell>
          <Table.HeaderCell scope="col">Svar</Table.HeaderCell>
          <Table.HeaderCell scope="col">Lenke</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{Rows}</Table.Body>
    </Table>
  )
}

export default SummaryTable
