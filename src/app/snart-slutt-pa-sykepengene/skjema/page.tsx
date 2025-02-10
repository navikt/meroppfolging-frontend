import { senOppfolgingStatus } from '@/server/actions/senOppfolgingStatus'
import React from 'react'
import { StepHandler } from '@/components/Form/StepHandler'
import { getMaxDate } from '@/server/actions/getMaxDate'

export default async function Page() {
  const status = await senOppfolgingStatus()
  const maxDate = await getMaxDate()

  return <StepHandler senOppfolgingStatus={status} maxDate={maxDate} />
}
