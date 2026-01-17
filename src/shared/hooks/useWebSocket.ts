import { useEffect, useState, useRef } from 'react';
import { useAppDispatch } from './store';
import WebSocketManager from '@/shared/lib/websocket/WebSocketManager';
import { createMessageHandler } from '@/shared/lib/websocket/messageHandlers';
import { WebSocketStatus } from '@/shared/types/websocket';
import { getCookie } from 'cookies-next';
import { UserRole } from '@/shared/configs/routes';
import store from '@/store/store';

/**
 * Хук для работы с WebSocket соединением
 * Использует централизованный WebSocketManager (singleton)
 * Автоматически подключается при монтировании компонента
 * Обрабатывает входящие сообщения и диспатчит их в Redux
 *
 * ⚠️ ВАЖНО: Бэкенд не обрабатывает входящие сообщения через WebSocket
 * Все действия должны выполняться через REST API
 */
export const useWebSocket = () => {
	const dispatch = useAppDispatch();
	const [status, setStatus] = useState<WebSocketStatus>(
		WebSocketStatus.DISCONNECTED,
	);
	const managerRef = useRef(WebSocketManager.getInstance());

	// Отслеживаем предыдущий статус для определения изменений
	const prevStatusRef = useRef<WebSocketStatus>(WebSocketStatus.DISCONNECTED);

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		const baseWsURL = process.env.NEXT_PUBLIC_WS_URL;

		if (typeof window === 'undefined' || !token || !baseWsURL) {
			return;
		}

		// Определяем роль пользователя для выбора правильного эндпоинта
		const role = getCookie('role') as UserRole | undefined;

		// Формируем URL в зависимости от роли
		// Студент: /ws/simulation/student/
		// Учитель: /ws/simulation/teacher/
		let wsURL: string;

		// Извлекаем базовый URL (протокол + хост + порт)
		// Например: ws://127.0.0.1:8000
		const urlMatch = baseWsURL.match(/^(wss?:\/\/[^\/]+)/);
		const baseHost = urlMatch ? urlMatch[1] : baseWsURL;

		// Формируем полный путь в зависимости от роли
		if (role === 'teacher') {
			wsURL = `${baseHost}/ws/simulation/teacher/`;
		} else {
			// По умолчанию для студентов (и admin)
			wsURL = `${baseHost}/ws/simulation/student/`;
		}

		// Подключаемся к WebSocket
		managerRef.current.connect(wsURL, token);

		// Создаем обработчик сообщений с диспатчем в Redux и функцией получения состояния
		const messageHandler = createMessageHandler(dispatch, () => store.getState());

		// Подписываемся на сообщения
		const unsubscribeMessage = managerRef.current.onMessage(messageHandler);

		// Подписываемся на изменения статуса
		const unsubscribeStatus = managerRef.current.onStatusChange(
			newStatus => {
				setStatus(newStatus);

				// Логируем изменения статуса для отладки
				if (prevStatusRef.current !== newStatus) {
					console.info(
						`WebSocket status changed: ${prevStatusRef.current} -> ${newStatus}`,
					);
					prevStatusRef.current = newStatus;
				}
			},
		);

		// Очистка при размонтировании
		return () => {
			unsubscribeMessage();
			unsubscribeStatus();
			// Не отключаемся при размонтировании, так как соединение общее для всего приложения
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []); // Пустой массив зависимостей, так как manager - singleton, а dispatch стабилен

	return {
		status,
		isConnected: managerRef.current.isConnected(),
	};
};
