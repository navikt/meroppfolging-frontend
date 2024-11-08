import { FormRequestSchema } from '@/server/services/schemas/formRequestSchema'
import { getStatus, postForm } from '@/server/services/senoppfolgingService'

import { authenticatedProcedure, router } from '../trpc'
import { getFeatureToggles } from '../services/toggleService'
import { getMaxDate } from '../services/esyfoVarselService'

export const appRouter = router({
  featureToggles: authenticatedProcedure.query(async () => {
    return getFeatureToggles()
  }),
  maxDate: authenticatedProcedure.query(async ({ ctx }) => {
    return getMaxDate(ctx.authorization)
  }),
  status: authenticatedProcedure.query(async ({ ctx }) => {
    return getStatus(ctx.authorization)
  }),
  submitForm: authenticatedProcedure.input(FormRequestSchema).mutation(async ({ ctx, input }) => {
    return postForm(ctx.authorization, input)
  }),
})

export type AppRouter = typeof appRouter
