import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'

import { authenticateIdportenToken } from '@/auth'

interface CreateContextOptions {
  authorization?: string
}
export function createContext(opts: CreateNextContextOptions): CreateContextOptions {
  const authHeader = opts.req.headers['authorization']

  return {
    authorization: authHeader,
  }
}
type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

const authenticate = t.middleware(async (opts) => {
  const authHeader = opts.ctx.authorization

  const authorization = await authenticateIdportenToken(authHeader)

  return opts.next({
    ctx: { ...opts.ctx, authorization },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const authenticatedProcedure = t.procedure.use(authenticate)
