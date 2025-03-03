import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
});

const eslintConfig = [
	...compat.config({
		extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			sourceType: 'module',
			project: true,
		},
		ignorePatterns: [
			'*.scss',
			'*.css',
			'**/stories/**',
			'node_modules/',
			'dist/',
			'.config/*',
			'*.mjs',
		],
		rules: {
			semi: ['error'],
			quotes: ['error', 'single'],
			'prefer-arrow-callback': ['error'],
			'prefer-template': ['error'],
			'no-console': 'warn', // Или 'error' для строгого запрета
			'no-var': 'error',
			'prefer-const': 'error', // Запреь на использование let, когда нужен const
			'@typescript-eslint/no-unused-vars': 'error', // Ошибка при написании неиспользуемых переменных
			'@typescript-eslint/no-explicit-any': 'error', // Запрещает использование any
			'@typescript-eslint/no-unsafe-argument': 'error', // Запрет на передачу аргументов с типом unknown в функции
			'@typescript-eslint/no-unsafe-assignment': 'error', // Запрет на присвоение значения с типом unknown переменным
		},
	}),
];

export default eslintConfig;
