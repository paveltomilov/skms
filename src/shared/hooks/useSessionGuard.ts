'use client';

import { useEffect } from 'react';
import { logout } from '../api/auth/auth';

export function useSessionGuard() {
	useEffect(() => {
		const originalWebSocket = window.WebSocket;

		window.WebSocket = function (
			url: string | URL,
			protocols?: string | string[],
		): WebSocket {
			const ws = new originalWebSocket(url, protocols);

			// Слушаем сообщения от бэкенда
			ws.addEventListener('message', (event: MessageEvent) => {
				if (typeof event.data === 'string') {
					try {
						const data = JSON.parse(event.data) as {
							type?: string;
						};

						// Проверяем, пришло ли сообщение об удалении студента
						if (data.type === 'student_deleted') {
							logout();
							window.location.href = '/login';
						}
					} catch {}
				}
			});

			return ws;
		} as unknown as typeof WebSocket;

		return () => {
			window.WebSocket = originalWebSocket;
		};
	}, []);
}
