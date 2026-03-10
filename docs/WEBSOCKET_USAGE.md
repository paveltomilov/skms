# Использование WebSocket в проекте

## Архитектура

WebSocket используется для получения данных от бэкенда в реальном времени. Все данные сохраняются в Redux, и компоненты получают их через селекторы, а не напрямую из WebSocket.

```
Бэкенд (Django Channels)
    ↓ WebSocket сообщения
WebSocketManager (Singleton)
    ↓ обработка сообщений
messageHandlers.ts
    ↓ dispatch actions
Redux Store (simulationSlice, gateSlice, circuitSlice, etc.)
    ↓ useAppSelector
React компоненты
```

---

## 1. Инициализация WebSocket

### Точка входа: `src/app/(protected)/layout.tsx`

WebSocket инициализируется на уровне защищенного layout, что означает, что соединение устанавливается для всех защищенных страниц:

```typescript
export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// Инициализация WebSocket соединения
	useWebSocket();

	// ... остальной код
}
```

**Почему здесь:**

-   Все защищенные страницы (ptk, zra, training и т.д.) используют этот layout
-   Одно соединение на все приложение (singleton pattern)
-   Автоматическое подключение при входе в защищенную зону

---

## 2. Хук `useWebSocket`

### Файл: `src/shared/hooks/useWebSocket.ts`

**Что делает:**

1. Получает токен из localStorage
2. Определяет роль пользователя (student/teacher)
3. Формирует URL WebSocket в зависимости от роли:
    - Студент: `/ws/simulation/student/`
    - Учитель: `/ws/simulation/teacher/`
4. Подключается к WebSocket через `WebSocketManager`
5. Подписывается на сообщения и изменения статуса

**Возвращает:**

```typescript
{
  status: WebSocketStatus,      // Текущий статус соединения
  isConnected: boolean           // true если соединение открыто
}
```

**Особенности:**

-   Singleton pattern - один экземпляр `WebSocketManager` на все приложение
-   Автоматическое переподключение при разрыве
-   Предотвращение множественных соединений

---

## 3. Обработка сообщений

### Файл: `src/shared/lib/websocket/messageHandlers.ts`

Обработчик `createMessageHandler` диспатчит действия в Redux в зависимости от типа сообщения:

#### 3.1. Сообщение инициализации симуляции (без поля `type`)

**Формат:**

```json
{
	"gate": "g2",
	"malfunctions": [{ "additionalProp1": "c.0.1" }]
}
```

**Что происходит:**

1. Извлекаются ID неисправностей (поддерживаются два формата)
2. Устанавливается активная задвижка: `setActiveGate(initMessage.gate)`
3. Обновляются неисправности задвижки: `setGateMalfunctions()`
4. Сохраняются данные симуляции: `setSimulation()`
5. Активируются неисправности в схеме: `activateMalfunction()`

**Redux actions:**

-   `setActiveGate(gateId)` → `gateSlice`
-   `setGateMalfunctions({id, malfunctions})` → `gateSlice`
-   `setSimulation({gate, malfunctions})` → `simulationSlice`
-   `activateMalfunction(malfunctionId)` → `circuitSlice`

#### 3.2. Другие типы сообщений

-   `simulation_finished` → `resetSimulation()` → очищает состояние симуляции
-   `gate_position` → `setGatePosition()` → обновляет позицию задвижки
-   `gate_state` → `setGateState()` → обновляет состояние задвижки
-   `points_update` → `setVoltagePoints()` → обновляет точки напряжения
-   `user_log` → логирование (для учителя)

---

## 4. Использование данных в компонентах

Компоненты **не используют WebSocket напрямую**. Они получают данные из Redux через `useAppSelector`.

### 4.1. Данные симуляции

**Где используется:**

-   `src/widgets/Sidebar/index.tsx` - проверка активной симуляции
-   `src/widgets/PopupAbortSimulationConfirm/index.tsx` - подтверждение отмены
-   `src/widgets/PopupUserInfo/index.tsx` - информация о пользователе

**Пример:**

```typescript
const simulation = useAppSelector(state => state.simulation);

// Проверка активной симуляции
if (simulation.simulationId !== null) {
	// Симуляция активна
}

// Доступ к данным
const gate = simulation.gate; // ID активной задвижки
const malfunctions = simulation.originalMalfunctions; // Список неисправностей
const found = simulation.foundMalfunctionIds; // Найденные неисправности
```

### 4.2. Данные задвижки

**Где используется:**

-   `src/widgets/PopupGateControl/index.tsx` - управление задвижкой
-   `src/shared/hooks/useGateControlButtons.ts` - кнопки управления
-   `src/shared/hooks/useGateMalfunctions.ts` - активация неисправностей

**Пример:**

```typescript
// Получение активной задвижки
const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';
const gate = useAppSelector(state => state.gate.gates[gateId]);

// Использование данных
<Gate
	state={gate.states} // Состояние задвижки
	malfunctions={gate.malfunctions} // Неисправности (из WebSocket)
/>;
```

### 4.3. Неисправности в схеме

**Где используется:**

-   `src/widgets/Scheme/index.tsx` - отображение схемы
-   `src/shared/hooks/useGateMalfunctions.ts` - автоматическая активация

**Пример:**

```typescript
// Хук автоматически активирует неисправности при изменении
export const useGateMalfunctions = () => {
	const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';
	const gateMalfunctions = useAppSelector(
		state => state.gate.gates[gateId].malfunctions,
	);

	useEffect(() => {
		// Активация неисправностей в схеме
		gateMalfunctions.forEach(id => dispatch(activateMalfunction(id)));
	}, [dispatch, gateMalfunctions]);
};
```

---

## 5. Поток данных при получении сообщения инициализации

```
1. Бэкенд отправляет WebSocket сообщение:
   {"gate": "g2", "malfunctions": [{"additionalProp1": "c.0.1"}]}

2. WebSocketManager получает сообщение
   ↓
3. messageHandlers.ts обрабатывает сообщение
   ↓
4. Диспатчятся Redux actions:
   - setActiveGate("g2")           → gateSlice.activeGateId = "g2"
   - setGateMalfunctions(...)      → gateSlice.gates["g2"].malfunctions = ["c.0.1"]
   - setSimulation(...)            → simulationSlice.gate = "g2"
   - activateMalfunction("c.0.1")  → circuitSlice (активация в схеме)
   ↓
5. React компоненты получают обновления через useAppSelector
   ↓
6. Компоненты перерисовываются с новыми данными
```

---

## 6. Доступность данных на страницах ptk и zra

### Страница PTK: `src/app/(protected)/ptk/page.tsx`

```typescript
const Ptk: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<TurbineUnitPage /> // Использует данные из Redux
		</Suspense>
	);
};
```

### Страница ZRA: `src/app/(protected)/zra/page.tsx`

```typescript
const Zra: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<ZraPage /> // Использует данные из Redux
		</Suspense>
	);
};
```

**Данные доступны через:**

-   `state.simulation` - данные симуляции (gate, originalMalfunctions)
-   `state.gate.activeGateId` - активная задвижка
-   `state.gate.gates[gateId]` - данные задвижки (malfunctions, position, state)
-   `state.circuit` - состояние схемы с активированными неисправностями

---

## 7. Важные особенности

### 7.1. Бэкенд не обрабатывает входящие сообщения

⚠️ **ВАЖНО:** Бэкенд не обрабатывает сообщения, отправленные клиентом через WebSocket.

**Все действия выполняются через REST API:**

-   Запуск симуляции → REST API
-   Отправка логов действий → REST API (`postUserLog`)
-   Остановка симуляции → REST API

**WebSocket используется только для получения данных от бэкенда.**

### 7.2. Singleton pattern

`WebSocketManager` использует singleton pattern:

-   Один экземпляр на все приложение
-   Одно соединение для всех компонентов
-   Автоматическое управление жизненным циклом

### 7.3. Автоматическое переподключение

При разрыве соединения:

-   Автоматические попытки переподключения (до 10 попыток)
-   Экспоненциальная задержка между попытками
-   Сохранение сообщений в очереди при разрыве

### 7.4. Предотвращение множественных соединений

-   Проверка состояния `CONNECTING` и `OPEN` перед созданием нового соединения
-   Если соединение активно - новое не создается
-   Логирование пропущенных попыток подключения

---

## 8. Примеры использования в компонентах

### Пример 1: Проверка активной симуляции

```typescript
// src/widgets/Sidebar/index.tsx
const simulation = useAppSelector(state => state.simulation);

const handleStartSimulation = useCallback(() => {
	if (simulation.simulationId !== null) {
		showToast('Симуляция уже активна', 'info');
		return;
	}
	// ... запуск симуляции
}, [simulation]);
```

### Пример 2: Отображение данных задвижки

```typescript
// src/widgets/PopupGateControl/index.tsx
const gateId = useAppSelector(state => state.gate.activeGateId) ?? 'g1';
const gate = useAppSelector(state => state.gate.gates[gateId]);

<Gate
	state={gate.states}
	malfunctions={gate.malfunctions} // ← из WebSocket
/>;
```

### Пример 3: Использование данных симуляции

```typescript
// Любой компонент на страницах ptk/zra
const simulation = useAppSelector(state => state.simulation);

// Доступ к данным
const activeGate = simulation.gate; // "g2"
const malfunctions = simulation.originalMalfunctions; // [{id: "c.0.1", ...}]
```

---

## 9. Диагностика

### Логирование

Все важные события логируются:

-   Подключение/отключение
-   Получение сообщений
-   Ошибки соединения
-   Переподключения

**Методы логирования:**

-   `console.info` - информационные сообщения
-   `console.debug` - отладочная информация
-   `console.error` - ошибки
-   `console.warn` - предупреждения

### Отладка

Для отладки WebSocket:

1. Откройте DevTools → Console
2. Фильтруйте по `[WebSocket]`
3. Проверьте Network → WS для просмотра соединений

---

## Итоговая схема использования

```
┌─────────────────────────────────────────────────────────┐
│  Бэкенд (Django Channels)                               │
│  Отправляет: {"gate": "g2", "malfunctions": [...]}     │
└──────────────────┬──────────────────────────────────────┘
                   │ WebSocket
                   ↓
┌─────────────────────────────────────────────────────────┐
│  WebSocketManager (Singleton)                           │
│  - Одно соединение на приложение                        │
│  - Автоматическое переподключение                       │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│  messageHandlers.ts                                     │
│  - Парсинг сообщений                                    │
│  - Диспатч Redux actions                                │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│  Redux Store                                            │
│  - simulationSlice: gate, originalMalfunctions          │
│  - gateSlice: activeGateId, gates[gateId].malfunctions  │
│  - circuitSlice: активированные неисправности            │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
┌─────────────────────────────────────────────────────────┐
│  React компоненты (ptk, zra, и т.д.)                    │
│  - useAppSelector(state => state.simulation)            │
│  - useAppSelector(state => state.gate)                  │
│  - Автоматическая перерисовка при изменении             │
└─────────────────────────────────────────────────────────┘
```

---

## Резюме

1. **Инициализация:** `useWebSocket()` в `(protected)/layout.tsx`
2. **Обработка:** `messageHandlers.ts` диспатчит в Redux
3. **Использование:** Компоненты получают данные через `useAppSelector`
4. **Доступность:** Данные доступны на всех страницах через Redux
5. **Особенности:** Singleton, автоматическое переподключение, только чтение от бэкенда
