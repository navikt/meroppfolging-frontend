/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.js', 'api.ts'],
  output: 'standalone',
  basePath: '/syk/meroppfolging',
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  productionBrowserSourceMaps: true,
}

module.exports = nextConfig
