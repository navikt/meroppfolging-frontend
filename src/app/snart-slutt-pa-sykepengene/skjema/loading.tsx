import React, { ReactElement } from 'react'
import { StepHandler } from '@/components/Form/StepHandler'

export default function Loading(): ReactElement {
  return (
    <StepHandler senOppfolgingStatus={{ hasAccessToSenOppfolging: true, response: null, responseDateTime: null }} />
  )
}
