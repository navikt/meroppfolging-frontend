'use client'

import { useEffect, useRef } from 'react'
import { logger as pinoLogger } from '@navikt/next-logger'

import { isLocalOrDemo } from '@/constants/envs'

import { AnalyticsTaxonomyEvents } from './events'
import { getAnalyticsInstance } from '@navikt/nav-dekoratoren-moduler'

const analyticsLogger = getAnalyticsInstance('snart-slutt-paa-sykepengene')

const infoProperties = { team: 'eSyfo', app: 'meroppfolging-frontend' }

function taxonomyToAnalyticsEvent(
  event: AnalyticsTaxonomyEvents,
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

export function useLogAnalyticsEvent(
  event: AnalyticsTaxonomyEvents,
  extraData?: Record<string, unknown>,
  condition: () => boolean = () => true,
): void {
  const stableEvent = useRef(event)
  const stableExtraData = useRef(extraData)
  const stableCondition = useRef(condition)

  useEffect(() => {
    if (stableCondition.current()) {
      logAnalyticsEvent(stableEvent.current, stableExtraData.current)
    }
  }, [])
}

export async function logAnalyticsEvent(
  event: AnalyticsTaxonomyEvents,
  extraData?: Record<string, unknown>,
): Promise<void> {
  const { eventType, eventProperties } = taxonomyToAnalyticsEvent(event, extraData)

  await logAnalyticsEventUsingDekoratorenInstance(eventType, eventProperties)
}

export async function logCustomAnalyticsEvent(event: string, extraData?: Record<string, unknown>): Promise<void> {
  const eventProperties = {
    ...infoProperties,
    ...extraData,
  }

  await logAnalyticsEventUsingDekoratorenInstance(event, eventProperties)
}

async function logAnalyticsEventUsingDekoratorenInstance(
  event: string,
  eventProperties: Record<string, unknown>,
): Promise<void> {
  if (isLocalOrDemo) {
    console.log(`Analytics event: ${event}, eventProperties:\n${(JSON.stringify(eventProperties ?? {}), null, 2)}`)
    return
  }

  try {
    await analyticsLogger(event, eventProperties)
  } catch (error) {
    const msg = typeof error === 'string' ? error : (error as Error)?.message || ''
    if (msg.includes('Analytics instance not found')) {
      return // Ignore, user has not consented to analytics
    }
    pinoLogger.error(`Analytics logging failed. event=${event} message=${msg}`)
  }
}
