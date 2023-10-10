import { authenticatedProcedure, router } from '../trpc'
import { postCompleteRegistration, getStartRegistration } from '../services/registeringService'
import { completeRegistrationSchema } from '../services/schemas/registreringSchema'
import { getFeatureToggles } from '../services/toggleService'

export const appRouter = router({
  startRegistration: authenticatedProcedure.query(async ({ ctx }) => {
    return getStartRegistration(ctx.authorization)
  }),
  completeRegistration: authenticatedProcedure.input(completeRegistrationSchema).mutation(async ({ ctx, input }) => {
    return postCompleteRegistration(ctx.authorization, input)
  }),
  featureToggles: authenticatedProcedure.query(async () => {
    return getFeatureToggles()
  }),
})

export type AppRouter = typeof appRouter
