import { trpcMsw } from '@/utils/trpc'
import { disabledFeatureToggles } from '@/mocks/data/fixtures/featureToggles'
import { getStatusPilotDTOFixture, storeFormRequest } from '@/mocks/testScenarioUtils'
import { FormRequest } from '@/pilot/server/services/schemas/formRequestSchema'
import * as statusPilotDtoFixtures from '@/mocks/data/fixtures/statusPilotDtoFixtures'

import { maxDateDTO } from './data/fixtures/esyfoVarselDTO'

//For demo and local
export const handlers = [
  trpcMsw.featureToggles.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(disabledFeatureToggles))
  }),
  trpcMsw.maxDate.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(maxDateDTO))
  }),
  trpcMsw.statusPilot.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(getStatusPilotDTOFixture()))
  }),
  trpcMsw.submitPilotForm.mutation((_req, res, ctx) => {
    const data: FormRequest = _req.body
    storeFormRequest(data)
    return res(ctx.status(200), ctx.data())
  }),
]

//For tests
export const testHandlers = [
  trpcMsw.featureToggles.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(disabledFeatureToggles))
  }),
  trpcMsw.maxDate.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(maxDateDTO))
  }),
  trpcMsw.statusPilot.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(statusPilotDtoFixtures.pilotIkkeSvart))
  }),
  trpcMsw.submitPilotForm.mutation((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data())
  }),
]
