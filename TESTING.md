# Тестирование

## Unit-тесты (Jest)

### Запуск
```bash
npm test
```

### Тесты для simulationSlice
- `src/store/__tests__/simulationSlice.test.ts`
  - Инициализация симуляции
  - Добавление найденных дефектов
  - Завершение симуляции
  - Восстановление состояния

### Тесты для handleFinishSimulation
- `src/widgets/PopupSetSimulation/__tests__/handleFinishSimulation.test.tsx`
  - Полный набор → успех
  - Неполный → toast
  - Блокировка кнопки

## E2E-тесты (Playwright)

### Установка зависимостей
```bash
npm install -D @playwright/test
npx playwright install
```

### Запуск
```bash
# Запуск всех E2E тестов
npm run test:e2e

# Запуск с UI
npm run test:e2e:ui
```

### Тесты завершения симуляции
- `e2e/simulation-completion.spec.ts`
  - Сценарий A: успешное завершение → модал → переход на /stats или /survey
  - Сценарий B: не все неисправности → появляется toast → остаёмся в симуляции

