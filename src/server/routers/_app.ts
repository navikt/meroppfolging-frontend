import { authenticatedProcedure, router } from '../trpc'
import { postCompleteRegistration, getStartRegistration } from '../services/registeringService'
import { completeRegistrationSchema } from '../services/schemas/registreringSchema'
import { getFeatureToggles } from '../services/toggleService'
import { getMaxDate } from '../services/esyfoVarselService'
import { getSykmeldt } from '../services/meroppfolgingService'
import { logger } from '@navikt/next-logger'

export const appRouter = router({
  startRegistration: authenticatedProcedure.query(async ({ ctx }) => {
    const [registrationType, sykmeldt] = await Promise.all([
      getStartRegistration(ctx.authorization),
      getSykmeldt(ctx.authorization),
    ])

    logger.info(
      `veilarbregistrering type [${registrationType.registreringType},${registrationType.formidlingsgruppe},${registrationType.servicegruppe},${registrationType.rettighetsgruppe},${sykmeldt}]`,
    )

    return { registrationType, sykmeldt }
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
