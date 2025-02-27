import { httpLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { createTRPCMsw } from 'msw-trpc'

import { BASE_PATH } from '@/constants/appConstants'
import type { AppRouter } from '@/server/routers/_app'

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${BASE_PATH}/api/trpc`,
        }),
      ],
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
})

export const trpcMsw = createTRPCMsw<AppRouter>()
