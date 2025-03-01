import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Разрешаем загрузку изображений из локальных источников
    domains: [], // Добавьте домены, если используете внешние изображения
    // Опционально: настройка форматов изображений
    formats: ['image/webp'],
    // Опционально: настройка deviceSizes и imageSizes
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': './src/components',
    };
    return config;
  },
};

module.exports = nextConfig;