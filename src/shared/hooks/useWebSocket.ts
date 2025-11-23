import { useEffect, useRef } from 'react';

export const useWebSocket = () => {
	const wsRef = useRef<WebSocket | null>(null);

	useEffect(() => {
		const token = localStorage.getItem('accessToken'); // 👈 Получаем токен из localStorage
		const wsURL = process.env.NEXT_PUBLIC_WS_URL;

		if (typeof window === 'undefined' || !token) return;

		wsRef.current = new WebSocket(
			`${wsURL}/?token=${token}`,
		);

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

		return () => {
			if (ws) {
				ws.removeEventListener('open', handleOpen);
				ws.removeEventListener('message', handleMessage);
				ws.removeEventListener('error', handleError);
				ws.removeEventListener('close', handleClose);

				if (ws.readyState === WebSocket.OPEN) {
					ws.close();
				}
			}
		};
	}, []);

	const sendMessage = (message: object) => {
		if (wsRef.current?.readyState === WebSocket.OPEN) {
			wsRef.current.send(JSON.stringify(message));
		}
	};

	return { sendMessage };
};
