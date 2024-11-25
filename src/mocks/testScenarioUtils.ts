import { SenOppfolgingStatusDTO } from '@/server/services/schemas/statusSchema'
import * as statusDtoFixtures from '@/mocks/data/fixtures/statusDtoFixtures'
import { FormRequest } from '@/server/services/schemas/formRequestSchema'

const SESSION_STORAGE_ANSWERS_KEY = 'answers'

export const storeFormRequest = (formRequest: FormRequest): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_STORAGE_ANSWERS_KEY, JSON.stringify(formRequest))
  }
}

export const nukeFormRequests = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_STORAGE_ANSWERS_KEY)
  }
}

export const getStatusDTOFixture = (): SenOppfolgingStatusDTO => {
  const storedAnswer: string | null = window.sessionStorage.getItem(SESSION_STORAGE_ANSWERS_KEY)
  if (storedAnswer) {
    const formAnswer: FormRequest = JSON.parse(storedAnswer)

    return {
      response: formAnswer.senOppfolgingFormV2,
      hasAccessToSenOppfolging: true,
    }
  }
  return statusDtoFixtures.IkkeSvart
}
