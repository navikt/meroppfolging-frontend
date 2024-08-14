import { StatusDTO } from '@/server/services/schemas/meroppfolgingSchema'
import { StatusPilotDTO } from '@/server/services/schemas/statusSchema'
import * as statusDtoFixtures from '@/mocks/data/fixtures/statusDtoFixtures'
import * as statusPilotDtoFixtures from '@/mocks/data/fixtures/statusPilotDtoFixtures'
import { FormRequest } from '@/pilot/server/services/schemas/formRequestSchema'

export type PilotStatus = 'PILOT' | 'DAGENS'
const SESSION_STORAGE_PILOT_STATUS_KEY = 'isMeroppfolgingPilot'
const SESSION_STORAGE_PILOT_ANSWERS_KEY = 'pilot-answers'

export const initializePilot = (): void => {
  if (typeof window !== 'undefined') {
    const isPilot = sessionStorage.getItem('isMeroppfolgingPilot')
    if (isPilot === null || isPilot === undefined) {
      storePilotStatus('PILOT')
    }
  }
}

export const storePilotStatus = (isPilot: PilotStatus): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.clear()
    sessionStorage.setItem(SESSION_STORAGE_PILOT_STATUS_KEY, isPilot)
  }
}

export const getStoredPilotStatus = (): PilotStatus => {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(SESSION_STORAGE_PILOT_STATUS_KEY) as PilotStatus
  }
  return 'PILOT'
}

export const storeFormRequest = (formRequest: FormRequest): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_STORAGE_PILOT_ANSWERS_KEY, JSON.stringify(formRequest))
  }
}

export const getStatusDTOFixture = (): StatusDTO => {
  return statusDtoFixtures.statusDtoIkkeSvart
}

export const getStatusPilotDTOFixture = (): StatusPilotDTO => {
  if (getStoredPilotStatus() === 'DAGENS') {
    return statusPilotDtoFixtures.erIkkePilot
  }
  const storedAnswer: string | null = window.sessionStorage.getItem(SESSION_STORAGE_PILOT_ANSWERS_KEY)
  if (storedAnswer) {
    const formAnswer: FormRequest = JSON.parse(storedAnswer)
    return {
      isPilot: true,
      response: formAnswer.senOppfolgingFormV2,
    }
  }
  return statusPilotDtoFixtures.pilotIkkeSvart
}
