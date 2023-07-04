/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.js', 'api.ts'],
  output: 'standalone',
  basePath: '/syk/mer-oppfolging-wip',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
}

module.exports = nextConfig
