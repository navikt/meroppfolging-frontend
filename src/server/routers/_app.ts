import { FormRequestSchema } from '@/server/services/schemas/formRequestSchema'
import { getSenOppfolgingStatus, postForm } from '@/server/services/senoppfolgingService'

import { authenticatedProcedure, router } from '../trpc'
import { getFeatureToggles } from '../services/toggleService'
import { getMaxDate } from '../services/sykepengedagerInformasjonService'

export const appRouter = router({
  featureToggles: authenticatedProcedure.query(async () => {
    return getFeatureToggles()
  }),
  maxDate: authenticatedProcedure.query(async ({ ctx }) => {
    return getMaxDate(ctx.authorization)
  }),
  senOppfolgingStatus: authenticatedProcedure.query(async ({ ctx }) => {
    return getSenOppfolgingStatus(ctx.authorization)
  }),
  submitForm: authenticatedProcedure.input(FormRequestSchema).mutation(async ({ ctx, input }) => {
    return postForm(ctx.authorization, input)
  }),
})

export type AppRouter = typeof appRouter
