import {
	WebSocketStatus,
	OutgoingMessage,
	WebSocketIncomingMessage,
	MessageHandler,
	StatusChangeHandler,
} from '@/shared/types/websocket';

/**
 * Централизованный менеджер WebSocket соединения (Singleton)
 * Обеспечивает:
 * - Одно соединение на приложение
 * - Автоматическое переподключение
 * - Очередь сообщений
 * - Обработку входящих сообщений
 */
class WebSocketManager {
	private static instance: WebSocketManager | null = null;
	private ws: WebSocket | null = null;
	private status: WebSocketStatus = WebSocketStatus.DISCONNECTED;
	private url: string | null = null;
	private token: string | null = null;
	private messageQueue: OutgoingMessage[] = [];
	private messageHandlers: Set<MessageHandler> = new Set();
	private statusHandlers: Set<StatusChangeHandler> = new Set();
	private reconnectAttempts = 0;
	private maxReconnectAttempts = 10;
	private reconnectDelay = 1000; // Начальная задержка в мс
	private maxReconnectDelay = 30000; // Максимальная задержка в мс
	private reconnectTimer: NodeJS.Timeout | null = null;
	private isManualClose = false;

	private constructor() {
		// Приватный конструктор для singleton
	}

	/**
	 * Получить экземпляр менеджера (Singleton)
	 */
	static getInstance(): WebSocketManager {
		if (!WebSocketManager.instance) {
			WebSocketManager.instance = new WebSocketManager();
		}
		return WebSocketManager.instance;
	}

	/**
	 * Подключиться к WebSocket серверу
	 */
	connect(url: string, token: string): void {
		if (typeof window === 'undefined') {
			return;
		}

		// Если уже подключены к тому же URL с тем же токеном, не переподключаемся
		if (
			this.ws &&
			this.ws.readyState === WebSocket.OPEN &&
			this.url === url &&
			this.token === token
		) {
			return;
		}

		this.url = url;
		this.token = token;
		this.isManualClose = false;
		this.reconnectAttempts = 0;

		this.doConnect();
	}

	/**
	 * Выполнить подключение
	 */
	private doConnect(): void {
		if (typeof window === 'undefined' || !this.url || !this.token) {
			return;
		}

		// Закрываем существующее соединение, если есть
		if (this.ws) {
			this.ws.close();
			this.ws = null;
		}

		this.setStatus(WebSocketStatus.CONNECTING);
		console.info('[WebSocket] ⟳ Попытка подключения к:', this.url);

		try {
			// Убираем завершающий слэш, если есть, чтобы избежать двойного слэша
			const cleanUrl = this.url.endsWith('/')
				? this.url.slice(0, -1)
				: this.url;
			const wsUrl = `${cleanUrl}/?token=${this.token}`;
			this.ws = new WebSocket(wsUrl);

			this.ws.addEventListener('open', this.handleOpen.bind(this));
			this.ws.addEventListener('message', this.handleMessage.bind(this));
			this.ws.addEventListener('error', this.handleError.bind(this));
			this.ws.addEventListener('close', this.handleClose.bind(this));
		} catch (error) {
			console.error('[WebSocket] ✗ Ошибка создания соединения:', error);
			this.setStatus(WebSocketStatus.ERROR);
			this.scheduleReconnect();
		}
	}

	/**
	 * Обработчик открытия соединения
	 */
	private handleOpen(event: Event): void {
		console.info('[WebSocket] ✓ Соединение установлено', event);
		this.setStatus(WebSocketStatus.CONNECTED);
		this.reconnectAttempts = 0;
		this.reconnectDelay = 1000;

		// Отправляем все сообщения из очереди
		this.flushMessageQueue();
	}

	/**
	 * Обработчик получения сообщения
	 */
	private handleMessage(event: MessageEvent): void {
		try {
			// Проверяем, что data является строкой
			const messageData =
				typeof event.data === 'string'
					? event.data
					: String(event.data);
			const data = JSON.parse(messageData) as WebSocketIncomingMessage;
			console.debug(
				'[WebSocket] ← Входящее сообщение:',
				JSON.stringify(data),
			);
			// Некоторые сообщения могут не иметь поля type
			if ('type' in data && data.type) {
				console.debug('[WebSocket] Тип сообщения:', data.type);
			} else {
				console.debug(
					'[WebSocket] Сообщение без поля type, структура:',
					Object.keys(data),
				);
			}

			// Уведомляем всех подписчиков
			this.messageHandlers.forEach(handler => {
				try {
					handler(data);
				} catch (error) {
					console.error('Error in message handler:', error);
				}
			});
		} catch (error) {
			console.error(
				'[WebSocket] Ошибка парсинга входящего сообщения:',
				error,
				'Raw data:',
				event.data,
			);
		}
	}

	/**
	 * Обработчик ошибки
	 */
	private handleError(error: Event): void {
		console.error('[WebSocket] ✗ Ошибка соединения:', error);
		this.setStatus(WebSocketStatus.ERROR);
	}

	/**
	 * Обработчик закрытия соединения
	 */
	private handleClose(event: CloseEvent): void {
		console.info('[WebSocket] ⊗ Соединение закрыто', {
			code: event.code,
			reason: event.reason,
			wasClean: event.wasClean,
		});

		this.ws = null;
		this.setStatus(WebSocketStatus.DISCONNECTED);

		// Переподключаемся только если закрытие не было ручным
		if (
			!this.isManualClose &&
			this.reconnectAttempts < this.maxReconnectAttempts
		) {
			this.scheduleReconnect();
		}
	}

	/**
	 * Запланировать переподключение с экспоненциальной задержкой
	 */
	private scheduleReconnect(): void {
		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer);
		}

		if (this.reconnectAttempts >= this.maxReconnectAttempts) {
			console.error(
				'[WebSocket] ✗ Достигнуто максимальное количество попыток переподключения. WebSocket не будет переподключаться.',
			);
			return;
		}

		this.reconnectAttempts++;
		const delay = Math.min(
			this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
			this.maxReconnectDelay,
		);

		console.info(
			`[WebSocket] Планируется попытка переподключения #${this.reconnectAttempts} через ${delay}ms`,
		);

		this.reconnectTimer = setTimeout(() => {
			if (!this.isManualClose && this.url && this.token) {
				this.doConnect();
			}
		}, delay);
	}

	/**
	 * Отправить сообщение
	 */
	send(message: OutgoingMessage): void {
		if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
			// Добавляем в очередь, если соединение не готово
			this.messageQueue.push(message);
			console.debug(
				'[WebSocket] Соединение не готово, сообщение добавлено в очередь:',
				JSON.stringify(message, null, 2),
			);
			return;
		}

		try {
			const messageString = JSON.stringify(message);
			console.debug(
				'[WebSocket] → Исходящее сообщение:',
				JSON.stringify(message, null, 2),
			);
			console.debug('[WebSocket] Тип сообщения:', message.type);
			this.ws.send(messageString);
		} catch (error) {
			console.error(
				'[WebSocket] Ошибка отправки сообщения:',
				error,
				'Message:',
				message,
			);
			// Добавляем в очередь для повторной попытки
			this.messageQueue.push(message);
		}
	}

	/**
	 * Отправить все сообщения из очереди
	 */
	private flushMessageQueue(): void {
		if (this.messageQueue.length > 0) {
			console.debug(
				`[WebSocket] Отправка ${this.messageQueue.length} сообщений из очереди`,
			);
		}
		while (this.messageQueue.length > 0) {
			const message = this.messageQueue.shift();
			if (message) {
				this.send(message);
			}
		}
	}

	/**
	 * Отключиться от сервера
	 */
	disconnect(): void {
		this.isManualClose = true;

		if (this.reconnectTimer) {
			clearTimeout(this.reconnectTimer);
			this.reconnectTimer = null;
		}

		if (this.ws) {
			this.ws.close();
			this.ws = null;
		}

		this.messageQueue = [];
		this.setStatus(WebSocketStatus.DISCONNECTED);
	}

	/**
	 * Подписаться на входящие сообщения
	 */
	onMessage(handler: MessageHandler): () => void {
		this.messageHandlers.add(handler);

		// Возвращаем функцию для отписки
		return () => {
			this.messageHandlers.delete(handler);
		};
	}

	/**
	 * Подписаться на изменения статуса
	 */
	onStatusChange(handler: StatusChangeHandler): () => void {
		this.statusHandlers.add(handler);

		// Сразу вызываем с текущим статусом
		handler(this.status);

		// Возвращаем функцию для отписки
		return () => {
			this.statusHandlers.delete(handler);
		};
	}

	/**
	 * Установить статус и уведомить подписчиков
	 */
	private setStatus(status: WebSocketStatus): void {
		if (this.status === status) {
			return;
		}

		this.status = status;
		this.statusHandlers.forEach(handler => {
			try {
				handler(status);
			} catch (error) {
				console.error('Error in status change handler:', error);
			}
		});
	}

	/**
	 * Получить текущий статус
	 */
	getStatus(): WebSocketStatus {
		return this.status;
	}

	/**
	 * Проверить, подключен ли WebSocket
	 */
	isConnected(): boolean {
		return (
			this.ws !== null &&
			this.ws.readyState === WebSocket.OPEN &&
			this.status === WebSocketStatus.CONNECTED
		);
	}
}

export default WebSocketManager;
