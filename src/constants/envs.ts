import { ZodError, z } from "zod";

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export const publicEnvSchema = z.object({
  NEXT_PUBLIC_RUNTIME_ENVIRONMENT: z.union([
    z.literal("local"),
    z.literal("test"),
    z.literal("demo"),
    z.literal("dev"),
    z.literal("prod"),
  ]),
  NEXT_PUBLIC_ASSET_PREFIX: z.string().optional(),
  NEXT_PUBLIC_TELEMETRY_URL: z.string().optional(),
  NEXT_PUBLIC_BASE_PATH: z.string(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export const serverEnvSchema = z.object({
  // Provided by nais-*.yaml
  SYKEPENGEDAGER_INFORMASJON_MAX_DATE_API_URL: z.string(),
  FLEXJAR_HOST: z.string(),
  FLEXJAR_BACKEND_CLIENT_ID: z.string(),
  MEROPPFOLGING_BACKEND_URL: z.string(),
  // Provided by nais
  TOKEN_X_WELL_KNOWN_URL: z.string(),
  TOKEN_X_CLIENT_ID: z.string(),
  TOKEN_X_PRIVATE_JWK: z.string(),
  IDPORTEN_WELL_KNOWN_URL: z.string(),
  IDPORTEN_CLIENT_ID: z.string(),
  NAIS_CLUSTER_NAME: z.string(),
});

const getValueAtPath = (input: unknown, path: PropertyKey[]): unknown =>
  path.reduce<unknown>((current, segment) => {
    if (current && typeof current === "object" && segment in current) {
      return (current as Record<PropertyKey, unknown>)[segment];
    }

    return undefined;
  }, input);

const getMissingEnvMessage = (error: ZodError, rawConfig: unknown): string => {
  const missingEnvPaths = [
    ...new Set(
      error.issues
        .filter((issue) => getValueAtPath(rawConfig, issue.path) === undefined)
        .map((issue) => issue.path.join(".")),
    ),
  ];

  return (
    missingEnvPaths.join(", ") ||
    "None are missing, but zod is not happy. Look at cause"
  );
};

const parseEnv = <TSchema extends z.ZodType>(
  schema: TSchema,
  rawConfig: unknown,
): z.infer<TSchema> => {
  try {
    return schema.parse(rawConfig);
  } catch (e) {
    if (e instanceof ZodError) {
      throw new Error(
        `The following envs are missing: ${getMissingEnvMessage(e, rawConfig)}`,
        { cause: e },
      );
    }

    throw e;
  }
};

const getRawPublicConfig = (): Partial<unknown> =>
  ({
    NEXT_PUBLIC_RUNTIME_ENVIRONMENT:
      process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT,
    NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    NEXT_PUBLIC_TELEMETRY_URL: process.env.NEXT_PUBLIC_TELEMETRY_URL,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  }) satisfies Record<keyof PublicEnv, string | undefined>;

/**
 * These envs are available in the browser. They are replaced during the bundling step by NextJS.
 *
 * They MUST be provided during the build step.
 */
export const publicEnv = parseEnv(publicEnvSchema, getRawPublicConfig());

const getRawServerConfig = (): Partial<unknown> =>
  ({
    // Provided by nais-*.yml
    SYKEPENGEDAGER_INFORMASJON_MAX_DATE_API_URL:
      process.env.SYKEPENGEDAGER_INFORMASJON_MAX_DATE_API_URL,
    FLEXJAR_HOST: process.env.FLEXJAR_HOST,
    FLEXJAR_BACKEND_CLIENT_ID: process.env.FLEXJAR_BACKEND_CLIENT_ID,
    MEROPPFOLGING_BACKEND_URL: process.env.MEROPPFOLGING_BACKEND_URL,

    // Provided by nais
    TOKEN_X_WELL_KNOWN_URL: process.env.TOKEN_X_WELL_KNOWN_URL,
    TOKEN_X_CLIENT_ID: process.env.TOKEN_X_CLIENT_ID,
    TOKEN_X_PRIVATE_JWK: process.env.TOKEN_X_PRIVATE_JWK,
    IDPORTEN_WELL_KNOWN_URL: process.env.IDPORTEN_WELL_KNOWN_URL,
    IDPORTEN_CLIENT_ID: process.env.IDPORTEN_CLIENT_ID,
    NAIS_CLUSTER_NAME: process.env.NAIS_CLUSTER_NAME,
  }) satisfies Record<keyof ServerEnv, string | undefined>;

export function getServerEnv(): ServerEnv & PublicEnv {
  return {
    ...parseEnv(serverEnvSchema, getRawServerConfig()),
    ...publicEnv,
  };
}

export const isLocalOrDemo =
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "local" ||
  process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === "demo";
