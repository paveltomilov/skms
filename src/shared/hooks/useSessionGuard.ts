'use client';

import { useEffect } from 'react';
import { logout } from '@/shared/api/auth/auth';

export function useSessionGuard() {
	useEffect(() => {
		const originalWebSocket = window.WebSocket;

		window.WebSocket = function (
			url: string | URL,
			protocols?: string | string[],
		): WebSocket {
			const ws = new originalWebSocket(url, protocols);
			ws.onclose = (event: CloseEvent) => {
				if (event.code === 1006) {
					logout();
					window.location.href = '/login';
				}
			};
			return ws;
		} as unknown as typeof WebSocket;

		return () => {
			window.WebSocket = originalWebSocket;
		};
	}, []);
}
