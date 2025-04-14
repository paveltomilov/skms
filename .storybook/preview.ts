import type { Preview } from '@storybook/react';

const preview: Preview = {
	parameters: {
		backgrounds: {
			default: 'light',
			values: [
				{
					name: 'light',
					value: '#d9d9d9',
				},
				{
					name: 'bg_new',
					value: '#E6E9EC',
				},
				{
					name: 'green',
					value: '#0AB700',
				},
				{
					name: 'red',
					value: '#ED3932',
				},
				{
					name: 'orange',
					value: '#FF7E22',
				},
				{
					name: 'pressed_button',
					value: '#A4A4A4',
				},
				{
					name: 'disabled_button',
					value: '#C0C0C0',
				},
			],
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
