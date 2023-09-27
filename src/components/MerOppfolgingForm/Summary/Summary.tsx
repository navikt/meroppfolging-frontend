import { Button, GuidePanel, Heading, Ingress, Table } from '@navikt/ds-react'
import Image from 'next/image'
import { filter, keys, pipe } from 'remeda'
import Link from 'next/link'
import { useRouter } from 'next/router'

import FormBackLink from '../FormComponents/FormBackLink'
import { getFormNavigation } from '../formStateMachine'

import summaryAvatar from './summary-avatar.svg'
import { completeRegistrationRequestMapper } from './completeRegistrationRequestMapper'

import { useMerOppfolgingFormContext } from '@/contexts/formContext'
import { FormSummaryPages, MerOppfolgingFormState } from '@/types/merOppfolgingForm'
import { summaryTexts } from '@/components/MerOppfolgingForm/Summary/summaryTexts'
import { isQuestionId } from '@/utils/tsUtils'
import { createFormValueState } from '@/domain/formValues'
import { getFormUrlObject } from '@/utils/utils'
import { trpc } from '@/utils/trpc'
import { logAmplitudeEvent } from '@/libs/amplitude/amplitude'
import { FORM_NAME } from '@/domain/formPages'

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
  const { formState } = useMerOppfolgingFormContext()
  const { previous } = getFormNavigation(FormSummaryPages.summary, formState)
  const { push } = useRouter()

  const mutation = trpc.completeRegistration.useMutation({
    onMutate: () => {
      logAmplitudeEvent({ eventName: 'skjema innsending startet', data: { skjemanavn: FORM_NAME } })
    },
    onError: () => {
      logAmplitudeEvent({ eventName: 'skjema innsending feilet', data: { skjemanavn: FORM_NAME } })
    },
    onSuccess: () => {
      logAmplitudeEvent({ eventName: 'skjema fullført', data: { skjemanavn: FORM_NAME } })
    },
  })

  const handleSubmit = (): void => {
    const formRequest = completeRegistrationRequestMapper(formState)

    mutation.mutate(formRequest)
    push('/reg/kvittering')
  }

  return (
    <>
      <FormBackLink formPage={previous} />
      <div>
        <Heading size="medium" level="1" spacing>
          Er opplysningene riktige?
        </Heading>
        <Ingress>Her er opplysningene vi har registrert om deg.</Ingress>
      </div>
      <GuidePanel poster illustration={<Image src={summaryAvatar} alt="" />}>
        <SummaryTable state={formState} />
      </GuidePanel>
      <Button className="w-fit" onClick={handleSubmit} disabled={mutation.isLoading}>
        Fullfør
      </Button>
    </>
  )
}

export default Summary
