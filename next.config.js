/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'www.gravatar.com', 'ec2-43-200-108-182.ap-northeast-2.compute.amazonaws.com:8080'],
  },
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
