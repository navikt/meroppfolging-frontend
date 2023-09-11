import { authenticatedProcedure, router } from '../trpc'
import { getStartRegistration, postCompleteRegistration } from '../services/registeringService'
import { completeRegistrationSchema } from '../services/schemas/registreringSchema'

export const appRouter = router({
  startRegistration: authenticatedProcedure.query(async ({ ctx }) => {
    return getStartRegistration(ctx.authorization)
  }),
  completeRegistration: authenticatedProcedure.input(completeRegistrationSchema).mutation(async ({ ctx, input }) => {
    return postCompleteRegistration(ctx.authorization, input)
  }),
})

export type AppRouter = typeof appRouter
