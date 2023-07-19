import axios, { Method } from 'axios'

const AUTHORIZATION_HEADER = 'Authorization'

export async function serverRequst<T>(url: string, accessToken: string, method: Method = 'get'): Promise<T> {
  return axios(url, {
    method: method,
    headers: { [AUTHORIZATION_HEADER]: `Bearer ${accessToken}` },
  })
    .then((response) => response.data)
    .catch((error) => {
      if (error.status === 401) {
        throw new Error(`Users access to API on path ${url} has expired`)
      }

      throw new Error(`Unknown error from API, responded with ${error.status} ${error.statusText} when fetching ${url}`)
    })
}
