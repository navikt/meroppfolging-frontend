import { Faro, getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk'
import { TracingInstrumentation } from '@grafana/faro-web-tracing'

import { browserEnv, isLocalOrDemo } from '@/constants/envs'

export const initFaro = (): Faro | null => {
  if (!browserEnv.NEXT_PUBLIC_TELEMETRY_URL || typeof window === 'undefined' || isLocalOrDemo) return null

  return initializeFaro({
    url: browserEnv.NEXT_PUBLIC_TELEMETRY_URL,
    app: {
      name: 'meroppfolging-frontend',
      version: browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT,
    },
    instrumentations: [
      ...getWebInstrumentations({
        captureConsole: false,
      }),
      new TracingInstrumentation(),
    ],
  })
}
