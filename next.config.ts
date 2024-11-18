import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: false,
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
};

export default nextConfig;
