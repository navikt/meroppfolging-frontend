import { z } from 'zod'

import { authenticatedProcedure, publicProcedure, router } from '../trpc'
import { getStartRegistrering } from '../services/registeringService'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
  sykmeldt: authenticatedProcedure.query(({ ctx }) => {
    return {
      sykmeldt: ctx.authorization,
    }
  }),
  startRegistering: authenticatedProcedure.query(async ({ ctx }) => {
    return getStartRegistrering(ctx.authorization)
  }),
})

export type AppRouter = typeof appRouter
