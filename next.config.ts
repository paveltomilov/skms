import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Другие настройки Next.js
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': './src/components',
    };
    return config;
  },
};

module.exports = nextConfig;
