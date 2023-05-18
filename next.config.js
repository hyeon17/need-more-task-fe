/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'localhost',
      'www.gravatar.com',
      'ec2-43-200-108-182.ap-northeast-2.compute.amazonaws.com:8080',
      'need-more-task.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  experimental: {
    esmExternals: false,
  },
};

// module.exports = withBundleAnalyzer(nextConfig);
module.exports = nextConfig;