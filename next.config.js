/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: ['./src'],
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },

  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
