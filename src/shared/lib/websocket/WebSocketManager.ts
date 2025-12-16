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
	private lastCloseCode: number | null = null;

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
			(this.ws.readyState === WebSocket.OPEN ||
				this.ws.readyState === WebSocket.CONNECTING) &&
			this.url === url &&
			this.token === token
		) {
			console.log(
				'[WebSocket] Соединение уже активно или подключается, пропускаем',
				{
					readyState:
						this.ws.readyState === WebSocket.OPEN
							? 'OPEN'
							: 'CONNECTING',
					url: url.replace(/\?token=.*/, '?token=***'),
				},
			);
			return;
		}

		// Сохраняем новые параметры
		this.url = url;
		this.token = token;
		this.isManualClose = false;
		this.reconnectAttempts = 0;

		// Если есть старое соединение, которое закрыто или закрывается,
		// doConnect() закроет его перед созданием нового
		this.doConnect();
	}

	/**
	 * Выполнить подключение
	 */
	private doConnect(): void {
		if (typeof window === 'undefined' || !this.url || !this.token) {
			return;
		}

		// Закрываем существующее соединение только если оно закрыто или закрывается
		// Не закрываем активные или подключающиеся соединения - это уже проверено в connect()
		if (this.ws) {
			const state = this.ws.readyState;
			if (state === WebSocket.CLOSED || state === WebSocket.CLOSING) {
				// Соединение уже закрыто или закрывается, просто очищаем ссылку
				this.ws = null;
			} else if (
				state === WebSocket.OPEN ||
				state === WebSocket.CONNECTING
			) {
				// Не должно происходить, так как это проверяется в connect()
				// Но на всякий случай логируем и не закрываем
				console.warn(
					'[WebSocket] Попытка создать соединение при активном соединении',
					{
						readyState:
							state === WebSocket.OPEN ? 'OPEN' : 'CONNECTING',
					},
				);
				return;
			}
		}

		this.setStatus(WebSocketStatus.CONNECTING);

		try {
			// Убираем завершающий слэш, если есть, чтобы избежать двойного слэша
			const cleanUrl = this.url.endsWith('/')
				? this.url.slice(0, -1)
				: this.url;
			const wsUrl = `${cleanUrl}/?token=${this.token}`;
			console.info(
				'[WebSocket] ⟳ Попытка подключения к:',
				wsUrl.replace(/\?token=.*/, '?token=***'),
			);
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
		this.lastCloseCode = null;

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
		const wsUrl = this.ws
			? `${this.url?.replace(/\?token=.*/, '')}?token=***`
			: 'не определен';

		const readyStateMap: Record<number, string> = {
			0: 'CONNECTING',
			1: 'OPEN',
			2: 'CLOSING',
			3: 'CLOSED',
		};

		const readyState = this.ws
			? readyStateMap[this.ws.readyState] ||
			  `UNKNOWN(${this.ws.readyState})`
			: 'null';

		// Получаем дополнительную информацию об ошибке
		const errorInfo: Record<string, unknown> = {
			url: wsUrl,
			readyState,
			readyStateCode: this.ws?.readyState,
			errorType: error.type,
			hasToken: !!this.token,
			tokenLength: this.token?.length || 0,
		};

		// Если есть WebSocket в error.target, добавляем его состояние
		if (error.target instanceof WebSocket) {
			const ws = error.target;
			errorInfo.wsUrl = ws.url.replace(/\?token=.*/, '?token=***');
			errorInfo.wsReadyState =
				readyStateMap[ws.readyState] || `UNKNOWN(${ws.readyState})`;

			// Если состояния различаются, это важная информация
			if (this.ws && this.ws.readyState !== ws.readyState) {
				errorInfo.stateMismatch = {
					description: 'Состояния WebSocket различаются',
					thisWsState: readyStateMap[this.ws.readyState],
					errorTargetState: readyStateMap[ws.readyState],
					note: 'Это может указывать на то, что соединение закрылось во время установки',
				};
			}
		}

		console.error('[WebSocket] ✗ Ошибка соединения:', errorInfo);

		// Дополнительная диагностика
		const currentState = this.ws?.readyState;
		const isConnecting = currentState === WebSocket.CONNECTING;
		const isClosed = currentState === WebSocket.CLOSED;

		if (isConnecting || isClosed) {
			const diagnosticInfo: Record<string, unknown> = {
				status: isConnecting ? 'CONNECTING' : 'CLOSED',
				description: isConnecting
					? 'Соединение пытается установиться, но не может завершиться'
					: 'Соединение было закрыто до установления',
				possibleCauses: {
					serverUnavailable: 'Сервер недоступен или не запущен',
					invalidURL: 'Неправильный URL или порт',
					networkError: 'Проблемы с сетью или файрволом',
					invalidToken: 'Невалидный или истекший токен',
					serverNotResponding:
						'Сервер не отвечает на WebSocket запросы',
					connectionRefused:
						'Сервер отклонил соединение (проверьте токен и настройки)',
				},
				checklist: [
					`Проверьте доступность сервера: ${this.url?.replace(
						/\/ws\/.*/,
						'',
					)}`,
					'Убедитесь, что Django сервер запущен',
					'Проверьте настройки Django Channels и ASGI',
					'Проверьте консоль сервера на наличие ошибок',
					'Проверьте настройки CORS и WebSocket в Django',
					'Убедитесь, что эндпоинт /ws/simulation/student/ существует',
				],
			};

			// Если соединение закрыто сразу после попытки подключения
			if (isClosed && this.reconnectAttempts === 0) {
				diagnosticInfo.immediateClose = {
					description:
						'Соединение закрылось сразу после попытки подключения',
					likelyCause:
						'Сервер не принимает WebSocket соединения или токен невалиден',
					action: 'Проверьте логи сервера и убедитесь, что WebSocket правильно настроен',
				};
			}

			console.error(
				`[WebSocket] Соединение в состоянии ${
					isConnecting ? 'CONNECTING' : 'CLOSED'
				}:`,
				diagnosticInfo,
			);
		}

		this.setStatus(WebSocketStatus.ERROR);
	}

	/**
	 * Обработчик закрытия соединения
	 */
	private handleClose(event: CloseEvent): void {
		const closeCodeMessages: Record<number, string> = {
			1000: 'Нормальное закрытие',
			1001: 'Удаленная сторона ушла',
			1002: 'Ошибка протокола',
			1003: 'Неподдерживаемый тип данных',
			1006: 'Ненормальное закрытие (без кода)',
			1007: 'Невалидные данные',
			1008: 'Нарушение политики',
			1009: 'Сообщение слишком большое',
			1011: 'Внутренняя ошибка сервера',
		};

		const closeInfo = {
			code: event.code,
			reason: event.reason || 'Не указана',
			wasClean: event.wasClean,
			message: closeCodeMessages[event.code] || 'Неизвестный код',
		};

		console.info('[WebSocket] ⊗ Соединение закрыто', closeInfo);

		// Если закрытие было ненормальным, логируем дополнительную информацию
		if (!event.wasClean) {
			const errorDetails: Record<string, unknown> = {
				code: event.code,
				reason: event.reason || 'Не указана',
				url: this.url?.replace(/\?token=.*/, '?token=***'),
				message: closeCodeMessages[event.code] || 'Неизвестный код',
			};

			// Специальная обработка для кода 1006
			if (event.code === 1006) {
				errorDetails.diagnosis = {
					description:
						'Соединение не может быть установлено. Сервер не отвечает или недоступен.',
					possibleCauses: [
						'Сервер WebSocket не запущен на указанном адресе',
						'Неправильный URL или порт',
						'Проблемы с сетью или файрволом',
						'Сервер не поддерживает WebSocket протокол',
						'Токен невалиден или истек',
					],
					recommendations: [
						'Проверьте, запущен ли Django сервер',
						'Убедитесь, что Django Channels настроен правильно',
						'Проверьте доступность сервера: curl http://127.0.0.1:8000',
						'Проверьте токен в localStorage',
						'Проверьте настройки CORS и ASGI',
					],
				};
			}

			console.error(
				'[WebSocket] Соединение закрыто ненормально:',
				errorDetails,
			);
		}

		this.ws = null;
		this.lastCloseCode = event.code;
		this.setStatus(WebSocketStatus.DISCONNECTED);

		// Переподключаемся только если закрытие не было ручным
		if (
			!this.isManualClose &&
			this.reconnectAttempts < this.maxReconnectAttempts
		) {
			this.scheduleReconnect();
		} else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
			console.error(
				'[WebSocket] ✗ Достигнуто максимальное количество попыток переподключения.',
				{
					attempts: this.reconnectAttempts,
					maxAttempts: this.maxReconnectAttempts,
					lastCloseCode: this.lastCloseCode,
					message:
						'WebSocket не будет переподключаться автоматически. Проверьте доступность сервера.',
				},
			);
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

		const reconnectInfo: Record<string, unknown> = {
			attempt: this.reconnectAttempts,
			maxAttempts: this.maxReconnectAttempts,
			delayMs: delay,
			url: this.url?.replace(/\?token=.*/, '?token=***'),
		};

		if (this.lastCloseCode !== null) {
			reconnectInfo.lastCloseCode = this.lastCloseCode;
			if (this.lastCloseCode === 1006) {
				reconnectInfo.note =
					'Последняя ошибка: 1006 (Сервер недоступен). Убедитесь, что сервер запущен.';
			}
		}

		console.info(
			`[WebSocket] Планируется попытка переподключения #${this.reconnectAttempts} через ${delay}ms`,
			reconnectInfo,
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
