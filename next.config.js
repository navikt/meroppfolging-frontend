/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
  productionBrowserSourceMaps: true,
  experimental: {
    optimizePackageImports: ['@navikt/aksel-icons', '@navikt/ds-react'],
  },
  async headers() {
    if (typeof window === 'undefined') {
      const { buildCspHeader } = await import('@navikt/nav-dekoratoren-moduler/ssr/index.js')
      const appDirectives = {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          "'unsafe-eval'",
          "'unsafe-inline'",
          'https://uxsignals-frontend.uxsignals.app.iterate.no',
        ],
        'script-src-elem': ["'self'", "'unsafe-inline'", 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
        'style-src': ["'self'", "'unsafe-inline'"],
        'style-src-elem': [
          "'self'",
          '*.nav.no',
          '*.psplugin.com',
          "'unsafe-inline'",
          '*.googleapis.com',
          '*.gstatic.com',
          'http://localhost:3000',
        ],
        'img-src': ["'self'", 'data:'],
        'font-src': ["'self'", 'https://cdn.nav.no'],
        'worker-src': ["'self'"],
        'connect-src': ["'self'", 'https://*.nav.no', 'https://*.uxsignals.com'],
      }

      const environment = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'prod' ? 'prod' : 'dev'
      const cspValue = await buildCspHeader(appDirectives, { env: environment })

      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: cspValue,
            },
          ],
        },
      ]
    }
    return []
  },
}

module.exports = nextConfig
