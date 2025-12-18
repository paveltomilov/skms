# Отчёт об изменениях: Автоматическая активация симуляции через WebSocket

## Обзор

Реализована автоматическая активация симуляции при получении данных через WebSocket, удалена ручная кнопка запуска симуляции, добавлено прерывание симуляции через API.

## Изменения

### 1. Сохранение `simulation_id` в состояние симуляции

-   **Файл**: `src/shared/types/websocket.ts`
-   Добавлено поле `simulation_id?: number` в интерфейс `SimulationInitMessage`
-   **Файл**: `src/store/simulationSlice.ts`
-   Обновлён `SetSimulationPayload` для поддержки `simulationId`
-   Обновлён reducer `setSimulation` для сохранения `simulation_id` из WebSocket сообщения

### 2. Автоматическое открытие попапа о начале симуляции

-   **Файл**: `src/shared/lib/websocket/messageHandlers.ts`
-   Добавлено автоматическое открытие модального окна `infoStartSimulation` при получении данных инициализации симуляции через WebSocket
-   Реализована логика показа попапа только один раз для каждой симуляции через `sessionStorage`

### 3. Удаление кнопки "Начать симуляцию"

-   **Файл**: `src/widgets/Sidebar/index.tsx`
-   Удалена кнопка "Начать симуляцию" и связанная функция `handleStartSimulation`
-   Удалены неиспользуемые импорты: `startSimulation`, `useToast`, `Toast`, `openModal`, `setActiveGate`, `activateMalfunction`, `SIMULATION_MALFUNCTIONS`

### 4. Прерывание симуляции через API

-   **Файл**: `src/widgets/PopupAbortSimulationConfirm/index.tsx`
-   Добавлен запрос на бэкенд `PATCH /simulation/{id}/` с `{"active": false}` при подтверждении прерывания
-   Добавлена очистка `sessionStorage` при прерывании симуляции для корректного показа попапа при следующей симуляции
-   Улучшена обработка ошибок при неудачном запросе

### 5. Улучшение функции `stopSimulation`

-   **Файл**: `src/shared/api/simulations/stopSimulation.ts`
-   Убрано явное указание заголовка `Authorization` (используются interceptors для консистентности)
-   Улучшена обработка ошибок с детальным логированием

## Технические детали

### Поток данных WebSocket → UI

```
WebSocket сообщение (simulation_id, gate, malfunctions)
  → messageHandlers.ts
    → setSimulation() (сохранение в Redux)
    → activateMalfunction() (активация неисправностей)
    → openModal('infoStartSimulation') (показ попапа один раз)
```

### Защита от повторного показа попапа

-   Используется `sessionStorage` с ключом `shownStartSimulationId`
-   При перезагрузке страницы попап не показывается повторно для той же симуляции
-   При прерывании симуляции `sessionStorage` очищается

## Зависимости

-   Бэкенд должен поддерживать эндпоинт `PATCH /simulation/{id}/` с телом `{"active": false}`
-   CORS должен быть настроен для поддержки PATCH запросов

## Тестирование

-   ✅ Попап о начале симуляции открывается автоматически при получении данных через WebSocket
-   ✅ Попап показывается только один раз для каждой симуляции
-   ✅ При перезагрузке страницы попап не показывается повторно
-   ✅ Кнопка "Начать симуляцию" удалена из UI
-   ✅ Прерывание симуляции отправляет запрос на бэкенд
-   ✅ При прерывании симуляции очищается `sessionStorage`
