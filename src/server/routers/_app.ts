import { z } from 'zod'

import { authenticatedProcedure, publicProcedure, router } from '../trpc'

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      }
    }),
  sykmeldt: authenticatedProcedure.query(() => {
    return {
      sykmeldt: 'sykmeldt',
    }
  }),
})

export type AppRouter = typeof appRouter
