import { ZodError, z } from 'zod'

export type PublicEnv = z.infer<typeof publicEnvSchema>
export const publicEnvSchema = z.object({
  NEXT_PUBLIC_RUNTIME_ENVIRONMENT: z.union([
    z.literal('local'),
    z.literal('test'),
    z.literal('demo'),
    z.literal('dev'),
    z.literal('production'),
  ]),
  NEXT_PUBLIC_ASSET_PREFIX: z.string().optional(),
})

export type ServerEnv = z.infer<typeof serverEnvSchema>
export const serverEnvSchema = z.object({
  // Provided by nais-*.yaml
  VEIARBLREGISTRERING_START_REGISTERING_API_URL: z.string(),

  // Provided my nais
  TOKEN_X_WELL_KNOWN_URL: z.string(),
  TOKEN_X_CLIENT_ID: z.string(),
  TOKEN_X_PRIVATE_JWK: z.string(),
  TOKEN_X_AUDIENCE: z.string(),
  IDPORTEN_WELL_KNOWN_URL: z.string(),
  IDPORTEN_CLIENT_ID: z.string(),
  NAIS_CLUSTER_NAME: z.string(),
})

/**
 * These envs are available in the browser. They are replaced during the bundling step by NextJS.
 *
 * They MUST be provided during the build step.
 */
export const browserEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_RUNTIME_ENVIRONMENT: process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT,
  NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX,
} satisfies Record<keyof PublicEnv, string | undefined>)

const getRawServerConfig = (): Partial<unknown> =>
  ({
    // Provided by nais-*.yml
    VEIARBLREGISTRERING_START_REGISTERING_API_URL: process.env.VEIARBLREGISTRERING_START_REGISTERING_API_URL,

    // Provided by nais
    TOKEN_X_WELL_KNOWN_URL: process.env.TOKEN_X_WELL_KNOWN_URL,
    TOKEN_X_CLIENT_ID: process.env.TOKEN_X_CLIENT_ID,
    TOKEN_X_PRIVATE_JWK: process.env.TOKEN_X_PRIVATE_JWK,
    TOKEN_X_AUDIENCE: process.env.TOKEN_X_AUDIENCE,
    IDPORTEN_WELL_KNOWN_URL: process.env.IDPORTEN_WELL_KNOWN_URL,
    IDPORTEN_CLIENT_ID: process.env.IDPORTEN_CLIENT_ID,
    NAIS_CLUSTER_NAME: process.env.NAIS_CLUSTER_NAME,
  } satisfies Record<keyof ServerEnv, string | undefined>)

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

export const isLocal = process.env.NODE_ENV !== 'production'
