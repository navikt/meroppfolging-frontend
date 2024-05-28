import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { SenOppfolgingStatusDTOV2 } from '@/server/services/schemas/statusSchemaV2'

export const useStatusV2 = (): UseQueryResult<SenOppfolgingStatusDTOV2, Error> => {
  const router = useRouter()

  const fetchStatusV2 = async (): Promise<SenOppfolgingStatusDTOV2> => {
    const response = await fetch(`${router.basePath}/api/sykmeldt`)
    return (await response.json()) as Promise<SenOppfolgingStatusDTOV2>
  }

  return useQuery<SenOppfolgingStatusDTOV2, Error>(['statusV2'], fetchStatusV2)
}
