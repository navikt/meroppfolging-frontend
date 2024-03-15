import { authenticatedProcedure, router } from '../trpc'
import { postCompleteRegistration, getStartRegistration } from '../services/registeringService'
import { completeRegistrationSchema } from '../services/schemas/registreringSchema'
import { getFeatureToggles } from '../services/toggleService'
import { getMaxDate } from '../services/esyfoVarselService'
import { getSykmeldt } from '../services/meroppfolgingService'

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
  maxDate: authenticatedProcedure.query(async ({ ctx }) => {
    return getMaxDate(ctx.authorization)
  }),
  sykmeldt: authenticatedProcedure.query(async ({ ctx }) => {
    return getSykmeldt(ctx.authorization)
  }),
})

export type AppRouter = typeof appRouter
