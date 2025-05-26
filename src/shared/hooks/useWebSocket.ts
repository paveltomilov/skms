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

    return () => {
      if (wsRef.current) {
        wsRef.current.removeEventListener('open', handleOpen);
        wsRef.current.removeEventListener('message', handleMessage);
        wsRef.current.removeEventListener('error', handleError);
        wsRef.current.removeEventListener('close', handleClose);
        wsRef.current.close();
      }
    };
  }, [url]);

  const sendMessage = (message: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return { sendMessage };
};