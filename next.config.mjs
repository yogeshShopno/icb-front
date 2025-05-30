/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Your other config options
  basePath: process.env.BASEPATH || '',

  eslint: {
    ignoreDuringBuilds: true
  },

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
    ];
  }
};

module.exports = nextConfig;
