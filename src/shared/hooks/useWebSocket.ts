// lib/websocket.ts
import { useEffect, useRef } from 'react';

export const useWebSocket = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Проверяем, что код выполняется на клиенте
    if (typeof window === 'undefined') return;

    // Создаем подключение
    wsRef.current = new WebSocket(url);

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

    wsRef.current.addEventListener('open', handleOpen);
    wsRef.current.addEventListener('message', handleMessage);
    wsRef.current.addEventListener('error', handleError);
    wsRef.current.addEventListener('close', handleClose);

  }, [url]);

  const sendMessage = (message: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
};

// Пример вызова хука, sendMessage выызывается для отправки данных на ws по симуляции

	// const { sendMessage } = useWebSocket(
	// 	`ws://127.0.0.1:8000/ws/simulation/student/?token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
	// );

	// const handleStart = () => {
	// 	sendMessage({
	// 		type: 'start_simulation',
	// 		studentId: '12345',
	// 	});
	// };

	// handleStart();