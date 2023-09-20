import { useEffect, useRef } from 'react'
import { getAmplitudeInstance } from '@navikt/nav-dekoratoren-moduler'

import { AmplitudeTaxonomyEvents } from './events'

import { browserEnv } from '@/constants/envs'
const logger = getAmplitudeInstance('dekoratoren')

function taxonomyToAmplitudeEvent(
  event: AmplitudeTaxonomyEvents,
  extraData: Record<string, unknown> | undefined,
): {
  eventType: string
  eventProperties: Record<string, unknown>
} {
  const properties = { ...('data' in event ? event.data : {}), ...extraData }

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

  if (browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'local') {
    console.log('Amplitude event: ' + eventType)
    if (eventProperties) {
      console.log(eventProperties)
    }

    return
  }

  logger(eventType, {
    ...eventProperties,
  })
}
