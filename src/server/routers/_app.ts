import { authenticatedProcedure, router } from '../trpc'
import { getStartRegistrering } from '../services/registeringService'

export const appRouter = router({
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
