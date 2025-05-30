/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASEPATH || '',

  async redirects() {
    return [
      {
        source: '/',
        destination: '/en/dashboards/crm',
        permanent: true,
        locale: false
      },
      {
        source: '/:lang(en|fr|ar)',
        destination: '/:lang/dashboards/crm',
        permanent: true,
        locale: false
      },
      {
        source: '/:path*',
        destination: '/en/:path*',
        permanent: true,
        locale: false
      }
    ]
  }
}

module.exports = nextConfig
