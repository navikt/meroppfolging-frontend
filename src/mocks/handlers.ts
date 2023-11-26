import { trpcMsw } from '@/utils/trpc'
import { disabledFeatureToggles } from '@/mocks/data/fixtures/featureToggles'

import { registreringSykmeldtDTO } from './data/fixtures/registeringDTO'

export const handlers = [
  trpcMsw.startRegistration.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(registreringSykmeldtDTO))
  }),
  trpcMsw.completeRegistration.mutation((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data())
  }),
  trpcMsw.featureToggles.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(disabledFeatureToggles))
  }),
]
