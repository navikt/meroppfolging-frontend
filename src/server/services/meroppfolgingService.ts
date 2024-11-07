import { exchangeIdportenTokenForMeroppfolgingBackendTokenx } from '@/auth/tokenUtils'
import { serverRequest } from '@/libs/axios'
import { getServerEnv } from '@/constants/envs'
import { PilotStatusSchema, StatusPilotDTO } from '@/server/services/schemas/statusSchema'

export async function getStatusPilot(auth: string): Promise<StatusPilotDTO> {
  const url = getServerEnv().MEROPPFOLGING_BACKEND_URL
  const path = `${url}/api/v2/senoppfolging/status`
  const tokenX = await exchangeIdportenTokenForMeroppfolgingBackendTokenx(auth)

  const response = await serverRequest<StatusPilotDTO>({ url: path, accessToken: tokenX })

  const result = PilotStatusSchema.safeParse(response)

  if (result.success) {
    return result.data
  }

  throw new Error(`Failed to parse response from ${path}: ${JSON.stringify(result.error)}`)
}
