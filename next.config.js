/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  outputFileTracingRoot: __dirname,
  env: {
    BASEURL: process.env.BASEURL,
    API2: process.env.API2,
    API: process.env.API,
  },
  images: { domains: ['api2.telecommongolia.mn'], unoptimized: true},
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            { key: 'X-Content-Type-Options', value: 'nosniff' },
            { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
            { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            {
              key: 'Permissions-Policy',
              value: 'camera=(), microphone=(self), geolocation=()'
            },
            { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' }
          ]
        }
      ]
    },
    async rewrites() {
        return [
          {
            source: '/api/2/:path*',
            destination: process.env.API2 + "/:path*"
          },
          {
            source: "/api/1/:path*",
            destination: process.env.API + "/:path*"
          }
        ]
      }
    
}

module.exports = nextConfig
