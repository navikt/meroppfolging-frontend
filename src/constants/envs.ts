import { ZodError, z } from 'zod'

export type PublicEnv = z.infer<typeof publicEnvSchema>
export const publicEnvSchema = z.object({
  NEXT_PUBLIC_RUNTIME_ENVIRONMENT: z.union([
    z.literal('local'),
    z.literal('test'),
    z.literal('demo'),
    z.literal('dev'),
    z.literal('prod'),
  ]),
  NEXT_PUBLIC_ASSET_PREFIX: z.string().optional(),
  NEXT_PUBLIC_API_MOCKING: z.string(),
  NEXT_PUBLIC_TELEMETRY_URL: z.string().optional(),
  NEXT_PUBLIC_BASE_PATH: z.string(),
  NEXT_PUBLIC_AKTIVITETSPLAN_URL: z.string(),
  NEXT_PUBLIC_ARBEIDSRETTET_DIALOG_URL: z.string(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>
export const serverEnvSchema = z.object({
  // Provided by nais-*.yaml
  VEIARBLREGISTRERING_START_REGISTRATION_API_URL: z.string(),
  VEIARBLREGISTRERING_COMPLETE_REGISTRATION_API_URL: z.string(),
  ESYFOVARSEL_MAX_DATE_API_URL: z.string(),

  // Provided by nais
  TOKEN_X_WELL_KNOWN_URL: z.string(),
  TOKEN_X_CLIENT_ID: z.string(),
  TOKEN_X_PRIVATE_JWK: z.string(),
  IDPORTEN_WELL_KNOWN_URL: z.string(),
  IDPORTEN_CLIENT_ID: z.string(),
  NAIS_CLUSTER_NAME: z.string(),
  // Provided by unleash
  UNLEASH_SERVER_API_URL: z.string(),
  UNLEASH_SERVER_API_TOKEN: z.string(),
})

/**
 * These envs are available in the browser. They are replaced during the bundling step by NextJS.
 *
 * They MUST be provided during the build step.
 */
export const browserEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_RUNTIME_ENVIRONMENT: process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT,
  NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX,
  NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
  NEXT_PUBLIC_TELEMETRY_URL: process.env.NEXT_PUBLIC_TELEMETRY_URL,
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  NEXT_PUBLIC_AKTIVITETSPLAN_URL: process.env.NEXT_PUBLIC_AKTIVITETSPLAN_URL,
  NEXT_PUBLIC_ARBEIDSRETTET_DIALOG_URL: process.env.NEXT_PUBLIC_ARBEIDSRETTET_DIALOG_URL,
} satisfies Record<keyof PublicEnv, string | undefined>)

const getRawServerConfig = (): Partial<unknown> =>
  ({
    // Provided by nais-*.yml
    VEIARBLREGISTRERING_START_REGISTRATION_API_URL: process.env.VEIARBLREGISTRERING_START_REGISTRATION_API_URL,
    VEIARBLREGISTRERING_COMPLETE_REGISTRATION_API_URL: process.env.VEIARBLREGISTRERING_COMPLETE_REGISTRATION_API_URL,
    ESYFOVARSEL_MAX_DATE_API_URL: process.env.ESYFOVARSEL_MAX_DATE_API_URL,

    // Provided by nais
    TOKEN_X_WELL_KNOWN_URL: process.env.TOKEN_X_WELL_KNOWN_URL,
    TOKEN_X_CLIENT_ID: process.env.TOKEN_X_CLIENT_ID,
    TOKEN_X_PRIVATE_JWK: process.env.TOKEN_X_PRIVATE_JWK,
    IDPORTEN_WELL_KNOWN_URL: process.env.IDPORTEN_WELL_KNOWN_URL,
    IDPORTEN_CLIENT_ID: process.env.IDPORTEN_CLIENT_ID,
    NAIS_CLUSTER_NAME: process.env.NAIS_CLUSTER_NAME,
    // Provided by unleash
    UNLEASH_SERVER_API_URL: process.env.UNLEASH_SERVER_API_URL,
    UNLEASH_SERVER_API_TOKEN: process.env.UNLEASH_SERVER_API_TOKEN,
  }) satisfies Record<keyof ServerEnv, string | undefined>

export function getServerEnv(): ServerEnv & PublicEnv {
  try {
    return { ...serverEnvSchema.parse(getRawServerConfig()), ...publicEnvSchema.parse(browserEnv) }
  } catch (e) {
    if (e instanceof ZodError) {
      throw new Error(
        `The following envs are missing: ${
          e.errors
            .filter((it) => it.message === 'Required')
            .map((it) => it.path.join('.'))
            .join(', ') || 'None are missing, but zod is not happy. Look at cause'
        }`,
        { cause: e },
      )
    } else {
      throw e
    }
  }
}

export const isLocalOrDemo =
  process.env.NODE_ENV !== 'production' || browserEnv.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'demo'
