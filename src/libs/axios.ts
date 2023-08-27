import axios from 'axios'

const AUTHORIZATION_HEADER = 'Authorization'

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

export async function serverRequst<T>(opt: AxiosServerRequstParams): Promise<T> {
  return axios(opt.url, {
    method: opt.method || 'get',
    headers: { [AUTHORIZATION_HEADER]: `Bearer ${opt.accessToken}` },
    ...(opt.method === 'post' && { data: opt.data }),
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error.status === 401) {
        throw new Error(`Users access to API on path ${opt.url} has expired`)
      }

      throw new Error(
        `Unknown error from API, responded with ${error.status} ${error.statusText} when fetching ${opt.url}`,
      )
    })
}
