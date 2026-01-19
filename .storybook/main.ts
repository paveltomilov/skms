import type { StorybookConfig } from '@storybook/nextjs';
import * as path from 'path';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-onboarding',
		'@storybook/addon-essentials',
		'@chromatic-com/storybook',
		'@storybook/addon-interactions',
		'storybook-css-modules',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	staticDirs: ['../public'],
	webpackFinal: async (config) => {
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				'@': path.resolve(__dirname, '../src'),
				'@/pages': path.resolve(__dirname, '../src/page-views'),
				'@public': path.resolve(__dirname, '../public'),
			};
		}
		return config;
	},
};
export default config;
