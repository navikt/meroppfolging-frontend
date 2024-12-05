import { useEffect, useRef } from 'react'
import { getAmplitudeInstance } from '@navikt/nav-dekoratoren-moduler'

import { isLocalOrDemo } from '@/constants/envs'

import { AmplitudeTaxonomyEvents } from './events'

const logger = getAmplitudeInstance('dekoratoren')

const infoProperties = { team: 'eSyfo', app: 'meroppfolging-frontend' }

function taxonomyToAmplitudeEvent(
  event: AmplitudeTaxonomyEvents,
  extraData: Record<string, unknown> | undefined,
): {
  eventType: string
  eventProperties: Record<string, unknown>
} {
  const properties = {
    ...('data' in event ? event.data : {}),
    ...infoProperties,
    ...extraData,
  }

  return {
    eventType: event.eventName,
    eventProperties: properties,
  }
}

export function useLogAmplitudeEvent(
  event: AmplitudeTaxonomyEvents,
  extraData?: Record<string, unknown>,
  condition: () => boolean = () => true,
): void {
  const stableEvent = useRef(event)
  const stableExtraData = useRef(extraData)
  const stableCondition = useRef(condition)

  useEffect(() => {
    if (stableCondition.current()) {
      logAmplitudeEvent(stableEvent.current, stableExtraData.current)
    }
  }, [])
}

export async function logAmplitudeEvent(
  event: AmplitudeTaxonomyEvents,
  extraData?: Record<string, unknown>,
): Promise<void> {
  const { eventType, eventProperties } = taxonomyToAmplitudeEvent(event, extraData)

  if (isLocalOrDemo) {
    console.log('Amplitude event: ' + eventType)
    if (eventProperties) {
      console.log(eventProperties)
    }

    return
  }

  await logger(eventType, {
    ...eventProperties,
  })
}

export async function logCustomAmplitudeEvent(event: string, extraData?: Record<string, unknown>): Promise<void> {
  const eventProperties = {
    ...infoProperties,
    ...extraData,
  }

  if (isLocalOrDemo) {
    console.log(`Custom Amplitude event: ${event}`, eventProperties)
    return
  }

  await logger(event, eventProperties)
}
