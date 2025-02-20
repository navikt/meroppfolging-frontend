import { senOppfolgingStatus } from '@/server/actions/senOppfolgingStatus'
import React from 'react'
import { StepHandler } from '@/components/Form/StepHandler'

export default async function Page() {
  const status = await senOppfolgingStatus()

  return <StepHandler senOppfolgingStatus={status} />
}
