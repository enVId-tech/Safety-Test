/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // Prefer loading of ES Modules over CommonJS
        esmExternals: true,
    },
    async redirects() {
        return [
          {
            source: '/old-path',
            destination: '/new-path',
            permanent: true,
          },
        ]
      },
}

module.exports = nextConfig