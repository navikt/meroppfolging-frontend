import React from 'react'
import { senOppfolgingStatus } from '@/server/actions/senOppfolgingStatus'
import { Landing } from '@/components/LandingInfo/Landing'
import { getMaxDate } from '@/server/actions/getMaxDate'
import { SenOppfolgingStatusDTO } from '@/server/services/schemas/statusSchema'
import { MaxDateDTO } from '@/server/services/schemas/sykepengedagerInformasjonSchema'

export default async function Page() {
  const status: SenOppfolgingStatusDTO = await senOppfolgingStatus()
  const maxDate: MaxDateDTO = await getMaxDate()

  return <Landing senOppfolgingStatus={status} maxDate={maxDate} />
}
