import { trpcMsw } from '@/utils/trpc'
import { disabledFeatureToggles } from '@/mocks/data/fixtures/featureToggles'

import { statusDTO } from './data/fixtures/statusDTO'
import { maxDateDTO } from './data/fixtures/esyfoVarselDTO'

export const handlers = [
  trpcMsw.sykmeldtStatus.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(statusDTO))
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
]
