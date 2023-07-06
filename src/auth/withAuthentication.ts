import { GetServerSidePropsContext, NextApiRequest, NextApiResponse, GetServerSidePropsResult } from 'next'
import { validateIdportenToken } from '@navikt/next-auth-wonderwall'
import { logger } from '@navikt/next-logger'

import { BASE_PATH } from '@/constants/paths'
import { isLocal } from '@/constants/envs'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<unknown> | unknown
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
 *
 */
export function withAuthenticatedPage(handler: PageHandler = defaultPageHandler) {
  return async function withBearerTokenHandler(
    context: GetServerSidePropsContext,
  ): Promise<ReturnType<NonNullable<typeof handler>>> {
    if (isLocal) {
      return handler(context)
    }
    const request = context.req

    const redirect = {
      redirect: {
        destination: `/oauth2/login?redirect=${BASE_PATH}/${context.resolvedUrl}`,
        permanent: false,
      },
    }

    const bearerToken: string | null | undefined = request.headers['authorization']
    if (!bearerToken) {
      return redirect
    }

    const validationResult = await validateIdportenToken(bearerToken)

    if (validationResult !== 'valid') {
      const error = new Error(
        `Invalid JWT token found (cause: ${validationResult.errorType} ${validationResult.message}, redirecting to login.`,
        { cause: validationResult.error },
      )

      logger.error(error)

      return redirect
    }

    return handler(context)
  }
}

/**
 * Used to authenticate Next.JS apis.
 */
export function withAuthenticatedApi(handler: ApiHandler): ApiHandler {
  return async function withBearerTokenHandler(req, res, ...rest) {
    const bearerToken: string | null | undefined = req.headers['authorization']

    const validatedToken = bearerToken ? await validateIdportenToken(bearerToken) : null

    if (!bearerToken || validatedToken !== 'valid') {
      if (validatedToken && validatedToken !== 'valid') {
        logger.error(`Invalid JWT token found (cause: ${validatedToken.message} for API ${req.url}`)
      }

      res.status(401).json({ message: 'Access denied' })
      return
    }

    return handler(req, res, ...rest)
  }
}
