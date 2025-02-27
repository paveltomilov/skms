import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

// Получаем текущую директорию
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Инициализируем FlatCompat
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Основная конфигурация ESLint
const eslintConfig = [
  // Расширяем конфигурации Next.js
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Добавляем кастомные правила
  {
    rules: {
      'no-console': 'warn', // Или 'error' для строгого запрета
    },
  },

  // Игнорируем файлы и папки
  {
    ignores: [
      '**/stories/**', // Игнорируем все файлы в папках stories
      'node_modules/', // Игнорируем node_modules
      'dist/', // Игнорируем папку dist
    ],
  },
];

export default eslintConfig;
