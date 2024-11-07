import { postForm } from '@/pilot/server/services/senoppfolgingService'
import { FormRequestSchema } from '@/pilot/server/services/schemas/formRequestSchema'

import { authenticatedProcedure, router } from '../trpc'
import { getFeatureToggles } from '../services/toggleService'
import { getMaxDate } from '../services/esyfoVarselService'
import { getStatusPilot } from '../services/meroppfolgingService'

export const appRouter = router({
  featureToggles: authenticatedProcedure.query(async () => {
    return getFeatureToggles()
  }),
  maxDate: authenticatedProcedure.query(async ({ ctx }) => {
    return getMaxDate(ctx.authorization)
  }),
  statusPilot: authenticatedProcedure.query(async ({ ctx }) => {
    return getStatusPilot(ctx.authorization)
  }),
  submitPilotForm: authenticatedProcedure.input(FormRequestSchema).mutation(async ({ ctx, input }) => {
    return postForm(ctx.authorization, input)
  }),
})

export type AppRouter = typeof appRouter
