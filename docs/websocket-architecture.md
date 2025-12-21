# Архитектура WebSocket в проекте

## Общая структура

Архитектура WebSocket построена на паттерне **Singleton** с централизованным менеджером соединения, обеспечивающим единую точку управления для всего приложения.

```
┌─────────────────────────────────────────────────────────────┐
│                    React Components                         │
│  (Dnd, ProtectedLayout, и другие компоненты)                │
└────────────────────┬────────────────────────────────────────┘
                     │ использует
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              useWebSocket Hook                              │
│  - Подключение к WebSocketManager                          │
│  - Подписка на сообщения и статус                           │
│  - Предоставление sendMessage API                          │
└────────────────────┬────────────────────────────────────────┘
                     │ использует
                     ▼
┌─────────────────────────────────────────────────────────────┐
│          WebSocketManager (Singleton)                       │
│  - Одно соединение на приложение                            │
│  - Автоматическое переподключение                           │
│  - Очередь сообщений                                        │
│  - Подписки на события                                      │
└────────────────────┬────────────────────────────────────────┘
                     │ использует
                     ▼
┌─────────────────────────────────────────────────────────────┐
│         createMessageHandler                                │
│  - Парсинг входящих сообщений                               │
│  - Диспатч действий в Redux                                │
└────────────────────┬────────────────────────────────────────┘
                     │ диспатчит
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Redux Store                                    │
│  (gateSlice, pointsSlice, circuitSlice, etc.)               │
└─────────────────────────────────────────────────────────────┘
```

---

## Компоненты системы

### 1. WebSocketManager (`src/shared/lib/websocket/WebSocketManager.ts`)

**Центральный менеджер WebSocket соединения (Singleton паттерн)**

#### Основные возможности:

-   ✅ **Одно соединение на приложение** - предотвращает множественные подключения
-   ✅ **Автоматическое переподключение** с экспоненциальной задержкой
-   ✅ **Очередь сообщений** для отправки до установки соединения
-   ✅ **Подписки на события** (сообщения, изменения статуса)
-   ✅ **Подробное логирование** всех операций

#### Ключевые методы:

```typescript
// Подключение
connect(url: string, token: string): void

// Отправка сообщения
send(message: OutgoingMessage): void

// Подписки
onMessage(handler: MessageHandler): () => void
onStatusChange(handler: StatusChangeHandler): () => void

// Утилиты
getStatus(): WebSocketStatus
isConnected(): boolean
disconnect(): void
```

#### Жизненный цикл соединения:

```
DISCONNECTED → CONNECTING → CONNECTED
     ↑                           ↓
     └─────────── ERROR ←────────┘
```

#### Механизм переподключения:

-   **Максимум попыток**: 10
-   **Экспоненциальная задержка**: 1s → 2s → 4s → ... → 30s (максимум)
-   **Не переподключается** при ручном закрытии (`disconnect()`)

---

### 2. useWebSocket Hook (`src/shared/hooks/useWebSocket.ts`)

**React хук для работы с WebSocket**

#### Что делает:

-   Получает экземпляр WebSocketManager (Singleton)
-   Автоматически подключается при монтировании компонента
-   Создает обработчик сообщений с диспатчем в Redux
-   Подписывается на сообщения и изменения статуса
-   Предоставляет удобный API для отправки сообщений

#### Возвращаемые значения:

```typescript
{
  sendMessage: (message: OutgoingMessage) => void,
  status: WebSocketStatus,
  isConnected: boolean
}
```

#### Особенности:

-   **Не отключает соединение** при размонтировании (соединение общее для всего приложения)
-   **Отслеживает изменения статуса** для логирования
-   Использует `useRef` для предотвращения лишних ре-рендеров

---

### 3. messageHandlers (`src/shared/lib/websocket/messageHandlers.ts`)

**Обработчик входящих сообщений с диспатчем в Redux**

#### Поддерживаемые типы сообщений:

1. **`gate_position`** → `setGatePosition` (обновление позиции задвижки)
2. **`gate_state`** → `setGateState` (обновление состояния задвижки)
3. **`points_update`** → `setVoltagePoints` (обновление точек схемы)
4. **`simulation_status`** → логирование (TODO: обработка)
5. **`error`** → логирование (TODO: уведомления пользователю)
6. **`circuit_update`** → логирование (TODO: обработка)
7. **Сообщения без `type`** с полями `gate` и `malfunctions` → `setGateMalfunctions`

#### Пример обработки:

```typescript
// Входящее сообщение: {"gate": "g1", "malfunctions": [{"additionalProp1": "c.0.1"}]}
// Преобразуется в: setGateMalfunctions({ id: "g1", malfunctions: ["c.0.1"] })
```

---

### 4. Типы (`src/shared/types/websocket.ts`)

**TypeScript типы для всех WebSocket сообщений**

#### Статусы соединения:

```typescript
enum WebSocketStatus {
	CONNECTING = 'connecting',
	CONNECTED = 'connected',
	DISCONNECTED = 'disconnected',
	ERROR = 'error',
}
```

#### Исходящие сообщения (клиент → сервер):

-   `StartSimulationMessage`: `{ type: 'start_simulation', studentId: string }`
-   `StopSimulationMessage`: `{ type: 'stop_simulation', simulationId: string }`

#### Входящие сообщения (сервер → клиент):

-   `GatePositionUpdateMessage`: `{ type: 'gate_position', gateId: string, position: number }`
-   `GateStateUpdateMessage`: `{ type: 'gate_state', gateId: string, state: string }`
-   `PointsUpdateMessage`: `{ type: 'points_update', points: Record<string, boolean> }`
-   `GateMalfunctionsUpdateMessage`: `{ gate: string, malfunctions: Array<Record<string, string>> }`
-   И другие...

---

## Поток данных

### Отправка сообщения:

```
Компонент (Dnd)
    ↓ sendMessage({ type: 'start_simulation', studentId: '123' })
useWebSocket Hook
    ↓ manager.send(message)
WebSocketManager
    ├─ Если соединение готово → ws.send(JSON.stringify(message))
    └─ Если не готово → messageQueue.push(message)
        ↓ (при установке соединения)
    flushMessageQueue() → отправка всех сообщений из очереди
```

### Получение сообщения:

```
WebSocket Server
    ↓ отправляет JSON
WebSocketManager.handleMessage()
    ├─ Парсит JSON
    ├─ Логирует в консоль
    └─ Вызывает всех подписчиков (messageHandlers)
        ↓
createMessageHandler(dispatch)
    ├─ Определяет тип сообщения
    ├─ Валидирует данные
    └─ Диспатчит Redux action
        ↓
Redux Store
    └─ Обновляет состояние (gateSlice, pointsSlice, etc.)
        ↓
React Components
    └─ Автоматически ре-рендерятся через useSelector
```

---

## Примеры использования

### 1. Отправка сообщения (в компоненте):

```typescript
const { sendMessage, isConnected } = useWebSocket();

useEffect(() => {
	if (!isConnected) return;

	sendMessage({
		type: 'start_simulation',
		studentId: '12345',
	});
}, [sendMessage, isConnected]);
```

### 2. Получение сообщения (автоматически):

```typescript
// Сервер отправляет: {"gate": "g1", "malfunctions": [{"id": "c.0.1"}]}
// Автоматически обрабатывается и обновляет Redux:
// state.gate.gates.g1.malfunctions = ["c.0.1"]
```

### 3. Отслеживание статуса:

```typescript
const { status, isConnected } = useWebSocket();

if (status === WebSocketStatus.CONNECTING) {
	// Показываем индикатор загрузки
}
```

---

## Логирование

Все операции WebSocket логируются в консоль браузера с префиксом `[WebSocket]`:

-   `[WebSocket] ⟳ Попытка подключения к: ws://...`
-   `[WebSocket] ✓ Соединение установлено`
-   `[WebSocket] → Исходящее сообщение: {...}`
-   `[WebSocket] ← Входящее сообщение: {...}`
-   `[WebSocket] Тип сообщения: gate_position`
-   `[WebSocket] ⊗ Соединение закрыто`
-   `[WebSocket] ✗ Ошибка соединения`
-   `[WebSocket] Планируется попытка переподключения #1 через 1000ms`

---

## Конфигурация

### Переменные окружения:

```env
NEXT_PUBLIC_WS_URL=ws://127.0.0.1:8000/ws/simulation/student
```

### URL соединения:

```
${NEXT_PUBLIC_WS_URL}/?token=${accessToken}
```

Токен берется из `localStorage.getItem('accessToken')`.

---

## Особенности реализации

1. **Singleton паттерн** - одно соединение на приложение
2. **Очередь сообщений** - сообщения сохраняются до установки соединения
3. **Автоматическое переподключение** - до 10 попыток с экспоненциальной задержкой
4. **Типизация** - все сообщения типизированы через TypeScript
5. **Интеграция с Redux** - автоматический диспатч действий
6. **Обработка ошибок** - логирование и возможность расширения
7. **Поддержка сообщений без `type`** - обработка через проверку структуры

---

## Текущие ограничения и TODO

-   ⚠️ `simulation_status` - только логирование (нужна обработка в simulationSlice)
-   ⚠️ `error` - только логирование (нужны уведомления пользователю)
-   ⚠️ `circuit_update` - только логирование (нужна обработка обновления схемы)
-   ⚠️ `studentId` в Dnd - используется `simulationId` (нужно получать из userInfo)

---

## Файловая структура

```
src/
├── shared/
│   ├── lib/
│   │   └── websocket/
│   │       ├── WebSocketManager.ts    # Singleton менеджер
│   │       ├── messageHandlers.ts      # Обработка сообщений
│   │       └── index.ts               # Экспорты
│   ├── hooks/
│   │   └── useWebSocket.ts            # React хук
│   └── types/
│       └── websocket.ts                # TypeScript типы
└── widgets/
    └── Dnd/
        └── index.tsx                   # Пример использования
```

---

## Тестирование

Для тестирования WebSocket соединения можно использовать `wscat`:

```bash
wscat -c "ws://localhost:8000/ws/simulation/student/?token=YOUR_TOKEN"
```

Отправка сообщения:

```json
{ "gate": "g1", "malfunctions": [{ "additionalProp1": "c.0.1" }] }
```

Сообщение должно автоматически обработаться и обновить Redux store.

---

Эта архитектура обеспечивает централизованное управление WebSocket соединением с автоматической обработкой сообщений и интеграцией с Redux, что делает систему надежной и легко расширяемой.
