import { z } from 'zod'

export type PublicEnv = z.infer<typeof publicEnvSchema>
export const publicEnvSchema = z.object({
  cdnPublicPath: z.union([z.string(), z.undefined()]),
})

/**
 * These envs are available in the browser. They are replaced during the bundling step by NextJS.
 *
 * They MUST be provided during the build step.
 */
export const browserEnv = publicEnvSchema.parse({
  cdnPublicPath: process.env.NEXT_PUBLIC_ASSET_PREFIX,
} satisfies Record<keyof PublicEnv, string | undefined>)

export const isLocal = process.env.NODE_ENV !== 'production'
