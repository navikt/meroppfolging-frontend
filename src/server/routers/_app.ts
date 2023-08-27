import { authenticatedProcedure, router } from '../trpc'
import { completeRegistration, getStartRegistration } from '../services/registeringService'
import { completeRegistrationSchema } from '../services/schemas/registreringSchema'

export const appRouter = router({
  sykmeldt: authenticatedProcedure.query(({ ctx }) => {
    return {
      sykmeldt: ctx.authorization,
    }
  }),
  startRegistration: authenticatedProcedure.query(async ({ ctx }) => {
    return getStartRegistration(ctx.authorization)
  }),
  completeRegistration: authenticatedProcedure.input(completeRegistrationSchema).mutation(async ({ ctx, input }) => {
    completeRegistration(ctx.authorization, input)
    return {}
  }),
})

export type AppRouter = typeof appRouter
