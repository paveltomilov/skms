import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	output: 'export',
	trailingSlash: true,
	images: {
		unoptimized: true, // Отключаем оптимизацию изображений для статического экспорта
		// Разрешаем загрузку изображений из локальных источников
		domains: [], // Добавьте домены, если используете внешние изображения
		// Опционально: настройка форматов изображений
		formats: ['image/webp'],
		// Опционально: настройка deviceSizes и imageSizes
		deviceSizes: [320, 420, 768, 1024, 1200],
		imageSizes: [16, 32, 48, 64, 96],
	},
	basePath: '',
	assetPrefix: '',

	webpack(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			'@': './src',
		};
		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule: any) =>
			rule.test?.test?.('.svg'),
		);

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: {
					not: [...fileLoaderRule.resourceQuery.not, /url/],
				}, // exclude if *.svg?url
				use: ['@svgr/webpack'],
			},
		);

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

module.exports = nextConfig;
