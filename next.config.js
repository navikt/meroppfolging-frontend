/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.js', 'api.ts'],
  output: 'standalone',
  basePath: '/syk/mer-oppfolging-wip',
}

module.exports = nextConfig
