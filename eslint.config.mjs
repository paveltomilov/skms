import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

const eslintConfig = [
	...compat.config({
		extends: [
			'next',
			'next/core-web-vitals',
			'next/typescript',
			'prettier',
			'plugin:storybook/recommended',
		],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			project: './tsconfig.json',
			tsconfigRootDir: import.meta.dirname,
			ecmaVersion: 'latest',
			sourceType: 'module',
			ecmaFeatures: {
				jsx: true,
			},
		},
		plugins: ['@next/next'],
		ignorePatterns: [
			'storybook-static/',
			'/.bundle$/',
			'coverage',
			'*.scss',
			'*.css',
			'**/*.stories.*',
			'node_modules/',
			'dist/',
			'*.login.ts',
			'*.mjs',
			'*.d.ts',
		],
		rules: {
			semi: ['error'],
			quotes: ['error', 'single'],
			'prefer-arrow-callback': ['error'],
			'prefer-template': ['error'],
			'no-console': [
				'warn',
				{
					allow: [
						'warn',
						'error',
						'info',
						'time',
						'timeEnd',
						'debug',
					],
				},
			],
			'no-var': 'error',
			'prefer-const': 'error', // Запреь на использование let, когда нужен const
			'@typescript-eslint/no-unused-vars': 'error', // Ошибка при написании неиспользуемых переменных
			'@typescript-eslint/no-explicit-any': 'error', // Запрещает использование any
			'@typescript-eslint/no-unsafe-argument': 'error', // Запрет на передачу аргументов с типом unknown в функции
			'@typescript-eslint/no-unsafe-assignment': 'error', // Запрет на присвоение значения с типом unknown переменным
			'@typescript-eslint/no-empty-object-type': 'warn', // чтобы можно было писать пустые интерфейсы как в interface CircuitGroup extends Array<CircuitBranch> {}
		},
	}),
];

export default eslintConfig;
