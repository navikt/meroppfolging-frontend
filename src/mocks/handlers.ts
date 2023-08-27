import { registreringSykmeldtDTO } from './data/fixtures/registeringDTO'

import { trpcMsw } from '@/utils/trpc'

export const handlers = [
  trpcMsw.startRegistration.query((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data(registreringSykmeldtDTO))
  }),
  trpcMsw.completeRegistration.mutation((_req, res, ctx) => {
    return res(ctx.status(200), ctx.data({}))
  }),
]
