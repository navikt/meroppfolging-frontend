import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { logger } from '@navikt/next-logger'
import { TRPCError } from '@trpc/server'
import { getToken, validateIdportenToken } from '@navikt/oasis'

import { isLocalOrDemo } from '@/constants/envs'
import { BASE_PATH } from '@/constants/paths'

type PageHandler = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<Record<string, unknown>>>

const defaultPageHandler: PageHandler = async () => {
  return {
    props: {},
  }
}

/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will automatically redirect to login if
 * Wonderwall-cookie is missing.
 */
export function withAuthenticatedPage(handler: PageHandler = defaultPageHandler) {
  return async function withBearerTokenHandler(
    context: GetServerSidePropsContext,
  ): Promise<ReturnType<NonNullable<typeof handler>>> {
    if (isLocalOrDemo) {
      return handler(context)
    }
    const request = context.req

    const redirect = {
      redirect: {
        destination: `/oauth2/login?redirect=${BASE_PATH}/${context.resolvedUrl}`,
        permanent: false,
      },
    }

    const bearerToken = getToken(request)
    if (!bearerToken) {
      return redirect
    }

    const validationResult = await validateIdportenToken(bearerToken)

    if (!validationResult.ok) {
      const error = new Error(
        `Invalid JWT token found, cause: ${validationResult.errorType} ${validationResult.error}, redirecting to login.`,
        { cause: validationResult.error },
      )

      logger.error(error)

      return redirect
    }

    return handler(context)
  }
}

/**
 * Used to authenticate tRPC apis.
 */
export async function authenticateIdportenToken(bearerToken?: string): Promise<string> {
  if (isLocalOrDemo) {
    return '123'
  }

  if (!bearerToken) {
    logger.error('Could not find any bearer token on the request. Denying request. This should not happen')
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Access denied',
    })
  }

  const validationResult = await validateIdportenToken(bearerToken)

  if (!validationResult.ok) {
    logger.error(`Invalid JWT token found, cause: ${validationResult.errorType} ${validationResult.error}`)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Access denied',
    })
  }

  return bearerToken
}
