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
  // images: {
  //   domains: ['example.com'],
  // },
};

module.exports = nextConfig;
