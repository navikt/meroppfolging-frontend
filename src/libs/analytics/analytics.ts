"use client";

import { getAnalyticsInstance } from "@navikt/nav-dekoratoren-moduler";
import { logger as pinoLogger } from "@navikt/next-logger";
import { useEffect, useRef } from "react";
import { isLocalOrDemo } from "@/constants/envs";
import {
  RuntimeErrorCode,
  RuntimeErrorEvent,
} from "@/constants/runtimeErrorContract";
import type { AnalyticsTaxonomyEvents } from "./events";

type AnalyticsLogger = (
  eventName: string,
  eventData?: Record<string, unknown>,
) => Promise<unknown>;

const analyticsLogger = getAnalyticsInstance(
  "snart-slutt-paa-sykepengene",
) as AnalyticsLogger;

const infoProperties = { team: "eSyfo", app: "meroppfolging-frontend" };
const analyticsFailureContext = {
  event_type: RuntimeErrorEvent.ANALYTICS_EVENT_SEND_FAILED,
  operation: "send_analytics_event",
  error_code: RuntimeErrorCode.ANALYTICS_CLIENT_ERROR,
  upstream: "nav-dekoratoren",
} as const;

function taxonomyToAnalyticsEvent(
  event: AnalyticsTaxonomyEvents,
  extraData: Record<string, unknown> | undefined,
): {
  eventType: string;
  eventProperties: Record<string, unknown>;
} {
  const properties = {
    ...("data" in event ? event.data : {}),
    ...infoProperties,
    ...extraData,
  };

  return {
    eventType: event.eventName,
    eventProperties: properties,
  };
}

export function useLogAnalyticsEvent(
  event: AnalyticsTaxonomyEvents,
  extraData?: Record<string, unknown>,
  condition: () => boolean = () => true,
): void {
  const stableEvent = useRef(event);
  const stableExtraData = useRef(extraData);
  const stableCondition = useRef(condition);

  useEffect(() => {
    if (stableCondition.current()) {
      logAnalyticsEvent(stableEvent.current, stableExtraData.current);
    }
  }, []);
}

export async function logAnalyticsEvent(
  event: AnalyticsTaxonomyEvents,
  extraData?: Record<string, unknown>,
): Promise<void> {
  const { eventType, eventProperties } = taxonomyToAnalyticsEvent(
    event,
    extraData,
  );

  await logAnalyticsEventUsingDekoratorenInstance(eventType, eventProperties);
}

export async function logCustomAnalyticsEvent(
  event: string,
  extraData?: Record<string, unknown>,
): Promise<void> {
  const eventProperties = {
    ...infoProperties,
    ...extraData,
  };

  await logAnalyticsEventUsingDekoratorenInstance(event, eventProperties);
}

async function logAnalyticsEventUsingDekoratorenInstance(
  event: string,
  eventProperties: Record<string, unknown>,
): Promise<void> {
  if (isLocalOrDemo) {
    return;
  }

  try {
    await analyticsLogger(event, eventProperties);
  } catch (error) {
    const msg =
      typeof error === "string" ? error : (error as Error)?.message || "";
    if (msg.includes("Analytics instance not found")) {
      return; // Ignore, user has not consented to analytics
    }
    pinoLogger.error(analyticsFailureContext, "Analytics logging failed");
  }
}
