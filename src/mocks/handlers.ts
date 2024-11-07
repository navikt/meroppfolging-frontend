import { trpcMsw } from '@/utils/trpc'
import { disabledFeatureToggles } from '@/mocks/data/fixtures/featureToggles'
import { getStatusDTOFixture, getStatusPilotDTOFixture, storeFormRequest } from '@/mocks/testScenarioUtils'
import { FormRequest } from '@/pilot/server/services/schemas/formRequestSchema'
import * as statusDtoFixtures from '@/mocks/data/fixtures/statusDtoFixtures'
import * as statusPilotDtoFixtures from '@/mocks/data/fixtures/statusPilotDtoFixtures'

import { maxDateDTO } from './data/fixtures/sykepengedagerInformasjonDTO'

//For demo and local
export const handlers = [
  trpcMsw.sykmeldtStatus.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(getStatusDTOFixture()))
  }),
  trpcMsw.submitSenOppfolging.mutation((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data())
  }),
  trpcMsw.featureToggles.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(disabledFeatureToggles))
  }),
  trpcMsw.maxDate.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(maxDateDTO))
  }),
  trpcMsw.visit.mutation((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data())
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
  trpcMsw.sykmeldtStatus.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(statusDtoFixtures.statusDtoIkkeSvart))
  }),
  trpcMsw.submitSenOppfolging.mutation((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data())
  }),
  trpcMsw.featureToggles.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(disabledFeatureToggles))
  }),
  trpcMsw.maxDate.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(maxDateDTO))
  }),
  trpcMsw.visit.mutation((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data())
  }),
  trpcMsw.statusPilot.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(statusPilotDtoFixtures.pilotIkkeSvart))
  }),
  trpcMsw.submitPilotForm.mutation((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data())
  }),
]
