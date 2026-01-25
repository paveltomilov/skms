# Анализ используемых технологий в проекте SMS (Skill Management System)

## 📋 Общая информация о проекте

**Название:** SMS (Skill Management System) - Frontend  
**Описание:** Интерфейс веб-приложения для имитации функционирования автоматизированного рабочего места машиниста на программно-техническом комплексе  
**Версия:** 0.1.0

---

## 🎯 Основной технологический стек

### Frontend Framework

-   **Next.js 15.1.6** - React-фреймворк для продакшена
    -   Используется App Router (структура `src/app/`)
    -   Режим экспорта статических страниц (`output: 'export'`)
    -   React Strict Mode включен
    -   Поддержка TypeScript из коробки

### UI Library

-   **React 19.0.0** - Библиотека для построения пользовательского интерфейса
-   **React DOM 19.0.0** - Рендеринг React компонентов

### Язык программирования

-   **TypeScript 5.x** - Типизированный JavaScript
    -   Строгий режим (`strict: true`)
    -   Target: ES2017
    -   Module: ESNext
    -   Path aliases: `@/*` → `./src/*`, `@public/*` → `./*`

---

## 🎨 Стилизация

### CSS Препроцессор

-   **Sass/SCSS 1.89.1** - Препроцессор CSS
-   **sass-loader 16.0.5** - Webpack loader для SCSS
-   Используются CSS Modules (`.module.scss`)

### Особенности стилизации

-   Модульный подход к стилям
-   Поддержка responsive дизайна через `react-responsive`

---

## 🔄 Управление состоянием

### Redux Toolkit

-   **@reduxjs/toolkit 2.5.1** - Официальный инструментарий Redux
-   **react-redux 9.2.0** - React биндинги для Redux
-   **redux-persist 6.0.0** - Сохранение состояния в localStorage

### Redux Slices (11 слайсов):

1. `circuitSlice` - Управление схемой цепи
2. `gateSlice` - Управление воротами/заслонками
3. `modalSlice` - Управление модальными окнами (20+ типов модалок)
4. `multimeterSlice` - Состояние мультиметра
5. `percentSlice` - Процентные значения
6. `pointsSlice` - Точки измерения напряжения
7. `powerUnitSlice` - Состояние силового блока
8. `trainingSlice` - Состояние тренировки
9. `updateListSlice` - Обновление списков
10. `userInfoSlice` - Информация о пользователе
11. `windowsSlice` - Управление окнами

### Персистентность

-   Сохранение в localStorage: `windows`, `percent`
-   Использование `redux-persist` для автоматической синхронизации

---

## 🌐 HTTP клиент и API

### Axios

-   **axios 1.11.0** - HTTP клиент для запросов к API
-   Настроены interceptors для автоматической авторизации
-   Базовая конфигурация через переменные окружения (`NEXT_PUBLIC_API_BASE_URL`)

### Аутентификация

-   JWT токены (access/refresh)
-   Хранение access token в localStorage
-   Хранение refresh token в cookies (`cookies-next 6.1.0`)
-   Автоматическое обновление токенов через interceptors

### WebSocket

-   Нативный WebSocket API для real-time коммуникации
-   Кастомный хук `useWebSocket`
-   URL через переменные окружения (`NEXT_PUBLIC_WS_URL`)

---

## 🏗️ Архитектура проекта

### Feature-Sliced Design (FSD)

Проект следует методологии FSD со следующей структурой:

```
src/
├── app/              # Инициализация приложения, роутинг
├── _pages/           # Страницы (legacy)
├── widgets/          # Композитные блоки (59 компонентов)
├── entities/         # Бизнес-сущности (17 компонентов)
├── shared/           # Переиспользуемые модули
│   ├── UI/           # UI компоненты (76 компонентов)
│   ├── hooks/        # Кастомные хуки (33 хука)
│   ├── utils/        # Утилиты (24 функции)
│   ├── types/        # TypeScript типы (20 файлов)
│   ├── configs/      # Конфигурации (31 файл)
│   └── lib/          # Библиотеки (5 файлов)
└── store/            # Redux store и slices
```

### Роутинг

-   Next.js App Router с группировкой маршрутов:
    -   `(auth)` - страницы аутентификации
    -   `(dashboard)` - дашборды для разных ролей
    -   `(protected)` - защищенные страницы

---

## 🎭 UI/UX библиотеки

### Drag and Drop

-   **@dnd-kit/core 6.3.1** - Библиотека для drag & drop
-   **@dnd-kit/modifiers 9.0.0** - Модификаторы для dnd-kit

### Карусели и слайдеры

-   **swiper 12.0.3** - Современная библиотека слайдеров

### Утилиты

-   **classnames 2.5.1** - Условное объединение CSS классов
-   **react-responsive 10.0.1** - Responsive дизайн компоненты

---

## 🧪 Тестирование

### Jest

-   **jest 29.7.0** - Тестовый фреймворк
-   **jest-environment-jsdom 29.7.0** - DOM окружение для тестов
-   **@testing-library/react 16.2.0** - Утилиты для тестирования React
-   **@testing-library/jest-dom 6.6.3** - Дополнительные матчеры для DOM
-   **@testing-library/dom 10.4.0** - Базовые утилиты для DOM

### Конфигурация тестов

-   Сбор покрытия кода (coverage)
-   Моки для SVG файлов
-   Настройка путей через `moduleNameMapper`
-   Coverage provider: v8

---

## 📚 Документация компонентов

### Storybook

-   **storybook 8.6.11** - Инструмент для разработки UI компонентов
-   **@storybook/nextjs 8.6.11** - Интеграция с Next.js
-   **@storybook/react 8.6.11** - React интеграция
-   **@storybook/addon-essentials 8.6.11** - Основные аддоны
-   **@storybook/addon-interactions 8.6.11** - Интерактивное тестирование
-   **@chromatic-com/storybook 3.2.6** - Визуальное тестирование
-   **storybook-css-modules 1.0.8** - Поддержка CSS Modules

### Количество stories

-   60+ файлов `.stories.*` для документирования компонентов

---

## 🔧 Инструменты разработки

### Линтинг и форматирование

-   **ESLint 9.22.0** - Линтер JavaScript/TypeScript
-   **@typescript-eslint/parser 8.26.1** - Парсер TypeScript для ESLint
-   **eslint-config-next 15.2.2** - Конфигурация ESLint для Next.js
-   **eslint-config-prettier 10.0.2** - Интеграция с Prettier
-   **@next/eslint-plugin-next 15.2.2** - Плагин Next.js для ESLint

### Правила ESLint

-   Строгие правила TypeScript (запрет `any`, `unknown`)
-   Обязательные точки с запятой
-   Одинарные кавычки
-   Предпочтение arrow functions
-   Предпочтение template literals
-   Запрет `var`, предпочтение `const`

### Git Hooks

-   **husky 9.1.7** - Git hooks для автоматизации

---

## 🖼️ Обработка ресурсов

### SVG

-   **@svgr/webpack 8.1.0** - Преобразование SVG в React компоненты
-   Настроена поддержка импорта SVG как компонентов
-   Альтернативный импорт как URL через `?url` query

### Изображения

-   Next.js Image Optimization (отключена для статического экспорта)
-   Поддержка WebP формата
-   Responsive изображения с различными размерами

---

## 🐳 Деплой и контейнеризация

### Docker

-   **Dockerfile** - Контейнеризация приложения
-   **docker-compose.yml** - Оркестрация контейнеров

### Сборка

-   Статический экспорт (`output: 'export'`)
-   Поддержка trailing slash
-   Оптимизация для production

---

## 📦 NPM скрипты

```json
{
	"dev": "next dev", // Разработка
	"build": "next build", // Сборка production
	"start": "next start", // Запуск production сервера
	"lint": "next lint", // Линтинг кода
	"sb": "storybook dev -p 6006", // Запуск Storybook
	"build-storybook": "storybook build", // Сборка Storybook
	"test": "jest", // Запуск тестов
	"test:watch": "jest --watch" // Тесты в watch режиме
}
```

---

## 🔐 Безопасность

### Аутентификация

-   JWT токены (access + refresh)
-   Автоматическое обновление токенов
-   Защищенные маршруты через middleware
-   Проверка авторизации на клиенте и сервере

### Хранение данных

-   Access token: localStorage
-   Refresh token: HTTP-only cookies (через `cookies-next`)
-   Персистентность Redux состояния в localStorage

---

## 🎯 Особенности реализации

### Паттерны проектирования

-   **SOLID принципы** - Следование принципам SOLID
-   **KISS принцип** - Простота решений
-   **Feature-Sliced Design** - Модульная архитектура
-   **Component Composition** - Композиция компонентов

### TypeScript

-   Строгая типизация
-   Запрет использования `any`
-   Типизированные Redux actions и state
-   Типизированные API ответы

### Производительность

-   React 19 с улучшенной производительностью
-   Оптимизация изображений
-   Code splitting через Next.js
-   Lazy loading компонентов

---

## 🔄 Интеграции

### Backend API

-   REST API через Axios
-   WebSocket для real-time обновлений
-   Переменные окружения для конфигурации

### Внешние сервисы

-   Настраиваемые через переменные окружения
-   Поддержка различных окружений (dev, staging, production)

---

## 📝 Выводы

Проект использует современный и зрелый технологический стек:

✅ **Сильные стороны:**

-   Актуальные версии всех библиотек (React 19, Next.js 15)
-   Строгая типизация TypeScript
-   Модульная архитектура (FSD)
-   Полное покрытие тестами и Storybook
-   Современные инструменты разработки

✅ **Рекомендации:**

-   Проект хорошо структурирован и следует best practices
-   Использование актуальных версий обеспечивает безопасность и производительность
-   Архитектура FSD обеспечивает масштабируемость

