import { GuidePanel, Heading, Ingress, Table } from '@navikt/ds-react'
import Image from 'next/image'
import { filter, keys, pipe } from 'remeda'
import Link from 'next/link'

import FormBack from '../MerOppfolgingForm/FormComponents/FormBack'

import summaryAvatar from './summary-avatar.svg'

import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { MerOppfolgingFormState } from '@/types/merOppfolgingForm'
import { summaryTexts } from '@/components/Summary/summaryTexts'
import { isQuestionId } from '@/utils/tsUtils'
import { createFormValueState } from '@/domain/formValues'
import { getFormUrlObject } from '@/utils/utils'

function SummaryTable({ state }: { state: MerOppfolgingFormState }): React.ReactElement {
  const formValueState = createFormValueState(state)

  const keysWithValue = pipe(
    keys(state),
    filter(isQuestionId),
    filter((key) => !!state[key]),
  )

  const Rows = keysWithValue.map((key) => {
    return (
      <Table.Row key={key}>
        <Table.HeaderCell scope="row">{summaryTexts[key]}</Table.HeaderCell>
        <Table.DataCell>{formValueState(key)}</Table.DataCell>
        <Table.DataCell>
          <Link href={getFormUrlObject(key)} aria-label={`Endre svaret på ${summaryTexts[key]}`} className="navds-link">
            Endre svaret
          </Link>
        </Table.DataCell>
      </Table.Row>
    )
  })

  return (
    <Table>
      <Table.Body>{Rows}</Table.Body>
    </Table>
  )
}

function Summary(): React.ReactElement {
  const { formState, previousForm } = useMerOppfolgingFormContext()

  return (
    <>
      <FormBack formPage={previousForm} />
      <Heading size="medium" level="1" spacing>
        Er opplysningene riktige?
      </Heading>
      <Ingress className="mbm">Her er opplysningene vi har registrert om deg.</Ingress>
      <GuidePanel poster illustration={<Image src={summaryAvatar} alt="" />}>
        <SummaryTable state={formState} />
      </GuidePanel>
    </>
  )
}

export default Summary
