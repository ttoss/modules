/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRoot: 'concurrent',
  },
};

module.exports = nextConfig;
