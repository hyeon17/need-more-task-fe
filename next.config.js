/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'www.gravatar.com'],
  },
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
