import { completeRegistrationSchema } from '@/server/services/schemas/meroppfolgingSchema'

import { authenticatedProcedure, router } from '../trpc'
import { getFeatureToggles } from '../services/toggleService'
import { getMaxDate } from '../services/esyfoVarselService'
import { getStatus, postSubmitSenOppfolging, postVisit } from '../services/meroppfolgingService'

export const appRouter = router({
  sykmeldtStatus: authenticatedProcedure.query(async ({ ctx }) => {
    return getStatus(ctx.authorization)
  }),
  submitSenOppfolging: authenticatedProcedure.input(completeRegistrationSchema).mutation(async ({ ctx, input }) => {
    return postSubmitSenOppfolging(ctx.authorization, input)
  }),
  visit: authenticatedProcedure.mutation(async ({ ctx }) => {
    return postVisit(ctx.authorization)
  }),
  featureToggles: authenticatedProcedure.query(async () => {
    return getFeatureToggles()
  }),
  maxDate: authenticatedProcedure.query(async ({ ctx }) => {
    return getMaxDate(ctx.authorization)
  }),
})

export type AppRouter = typeof appRouter
