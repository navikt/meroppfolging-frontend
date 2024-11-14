import { trpcMsw } from '@/utils/trpc'
import { disabledFeatureToggles } from '@/mocks/data/fixtures/featureToggles'
import { getStatusDTOFixture, storeFormRequest } from '@/mocks/testScenarioUtils'
import * as statusDtoFixtures from '@/mocks/data/fixtures/statusDtoFixtures'
import { FormRequest } from '@/server/services/schemas/formRequestSchema'

import { maxDateDTO } from './data/fixtures/sykepengedagerInformasjonDTO'

//For demo and local
export const handlers = [
  trpcMsw.featureToggles.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(disabledFeatureToggles))
  }),
  trpcMsw.maxDate.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(maxDateDTO))
  }),
  trpcMsw.status.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(getStatusDTOFixture()))
  }),
  trpcMsw.submitForm.mutation((_req, res, ctx) => {
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
  trpcMsw.status.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(statusDtoFixtures.IkkeSvart))
  }),
  trpcMsw.submitForm.mutation((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data())
  }),
]
