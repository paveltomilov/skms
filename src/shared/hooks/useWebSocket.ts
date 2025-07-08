import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';

export const useWebSocket = () => {
	const wsRef = useRef<WebSocket | null>(null);
	const session = useSession();
	const token = session.data?.user.access;

	useEffect(() => {
		// Проверяем, что код выполняется на клиенте и есть токен
		if (typeof window === 'undefined' || !token) return;

		// Создаем подключение
		wsRef.current = new WebSocket(
			`ws://127.0.0.1:8000/ws/simulation/student/?token=${token}`,
		);

		// Обработчики событий
		const handleOpen = (event: Event) => {
			console.log('WebSocket connected', event);
		};

		const handleMessage = (event: MessageEvent) => {
			console.log('Received message:', event.data);
		};

		const handleError = (error: Event) => {
			console.error('WebSocket error:', error);
		};

		const handleClose = () => {
			console.log('WebSocket disconnected');
		};

		const ws = wsRef.current;

		ws.addEventListener('open', handleOpen);
		ws.addEventListener('message', handleMessage);
		ws.addEventListener('error', handleError);
		ws.addEventListener('close', handleClose);

		// Функция очистки
		return () => {
			if (ws) {
				ws.removeEventListener('open', handleOpen);
				ws.removeEventListener('message', handleMessage);
				ws.removeEventListener('error', handleError);
				ws.removeEventListener('close', handleClose);

				// Закрываем соединение, если оно еще открыто
				if (ws.readyState === WebSocket.OPEN) {
					ws.close();
				}
			}
		};
	}, [token]);

	const sendMessage = (message: object) => {
		if (wsRef.current?.readyState === WebSocket.OPEN) {
			wsRef.current.send(JSON.stringify(message));
		}
	};

	return { sendMessage };
};

// Пример вызова хука, sendMessage выызывается для отправки данных на ws по симуляции
/* const { sendMessage } = useWebSocket();

	sendMessage({
		type: 'start_simulation',
		studentId: '12345',
	}); */
