/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost'],
  },
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
