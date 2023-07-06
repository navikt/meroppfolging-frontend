import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'

import type { AppRouter } from '../server/routers/_app'

import { BASE_PATH } from '@/constants/paths'

export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
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
