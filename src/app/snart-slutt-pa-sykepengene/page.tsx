import React from 'react'
import { senOppfolgingStatus } from '@/server/actions/senOppfolgingStatus'
import { Landing } from '@/components/LandingInfo/Landing'
import { getMaxDate } from '@/server/actions/getMaxDate'
import { SenOppfolgingStatusDTO } from '@/server/schemas/statusSchema'
import { MaxDateDTO } from '@/server/schemas/sykepengedagerInformasjonSchema'
import { BehovForOppfolgingAnswerTypes, FremtidigSituasjonAnswerTypes } from '@/domain/answerValues'
import Receipt from '@/components/Form/Receipt/Receipt'

export default async function Page() {
  const status: SenOppfolgingStatusDTO = await senOppfolgingStatus()
  const maxDate: MaxDateDTO = await getMaxDate()

  if (status.response) {
    const fremtidigSituasjonAnswer: FremtidigSituasjonAnswerTypes = status.response[0].answerType
    const behovForOppfolgingAnswer: BehovForOppfolgingAnswerTypes = status.response[1].answerType

    return (
      <Receipt
        fremtidigSituasjonAnswer={fremtidigSituasjonAnswer}
        behovForOppfolgingAnswer={behovForOppfolgingAnswer}
        responseDateISOString={status.responseDateTime}
        maxDate={maxDate}
      />
    )
  }

  return <Landing senOppfolgingStatus={status} maxDate={maxDate} />
}
