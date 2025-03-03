import { useEffect, useRef } from 'react'
import { getAmplitudeInstance } from '@navikt/nav-dekoratoren-moduler'
import { logger as pinoLogger } from '@navikt/next-logger'

import { isLocalOrDemo } from '@/constants/envs'

import { AmplitudeTaxonomyEvents } from './events'

const dekoratorenAmplitudeLogger = getAmplitudeInstance('dekoratoren')

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

  await logAmplitudeEventUsingDekoratorenInstance(eventType, eventProperties)
}

export async function logCustomAmplitudeEvent(event: string, extraData?: Record<string, unknown>): Promise<void> {
  const eventProperties = {
    ...infoProperties,
    ...extraData,
  }

  await logAmplitudeEventUsingDekoratorenInstance(event, eventProperties)
}

async function logAmplitudeEventUsingDekoratorenInstance(
  event: string,
  eventProperties: Record<string, unknown>,
): Promise<void> {
  if (isLocalOrDemo) {
    console.log(`Amplitude event: ${event}, eventProperties:\n${(JSON.stringify(eventProperties ?? {}), null, 2)}`)
    return
  }

  try {
    // This can throw an error (rejected promise), therefore try-catch
    await dekoratorenAmplitudeLogger(event, eventProperties)
  } catch (error) {
    pinoLogger.debug(`Could not log event to Amplitude. Message: ${(error as Error)?.message}`)
  }
}
