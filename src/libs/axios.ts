import { logger } from '@navikt/next-logger'
import axios from 'axios'
import { nanoid } from 'nanoid'

type AxiosServerRequstParams = {
  url: string
  accessToken: string
} & (
  | { method?: 'get' }
  | {
      method: 'post'
      data?: unknown
    }
)

export async function serverRequest<T>(opt: AxiosServerRequstParams): Promise<T> {
  return axios(opt.url, {
    method: opt.method || 'get',
    headers: {
      'Nav-Consumer-Id': 'meroppfolging-frontend',
      'Nav-Call-Id': nanoid(),
      'Content-Type': 'application/json',
      Authorization: `Bearer ${opt.accessToken}`,
    },
    ...(opt.method === 'post' && { data: opt.data }),
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error.status === 401) {
        logger.error(`Users access to API on path ${opt.url} has expired`)
        throw new Error(`Users access has expired`)
      }
      logger.error(`Unknown error from API, responded with error: ${error} when fetching ${opt.url}`)
      throw new Error(`Unknown error from API.`)
    })
}
