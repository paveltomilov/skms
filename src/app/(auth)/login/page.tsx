'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

interface AuthResponse {
	access: string;
	refresh: string;
}

export default function LoginPage() {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleLogin = async () => {
		try {
			const response = await axios.post<AuthResponse>(
				'http://localhost:8000/api/auth/',
				{ username, password },
				{
					headers: { 'Content-Type': 'application/json' },
					//withCredentials: true,
				},
			);

			const { access, refresh } = response.data;

			if (access && refresh) {
				localStorage.setItem('accessToken', access);
				localStorage.setItem('refreshToken', refresh);

				router.push('/ptk');
			} else {
				setError('Ошибка авторизации: токены не получены');
			}
		} catch (err: unknown) {
			// Приводим err к типу AxiosError, если возможно
			if (axios.isAxiosError(err)) {
				// Можно безопасно обращаться к err.response?.status
				if (err.response?.status === 401) {
					setError('Неверный логин или пароль');
				} else {
					setError('Ошибка подключения к серверу');
				}
			} else {
				// Если это не AxiosError — неизвестная ошибка
				setError('Произошла неизвестная ошибка');
			}

			// Можно убрать или оставить, отключив правило eslint
			// eslint-disable-next-line no-console
			console.error('Ошибка входа:', err);
		}
	};

	return (
		<div>
			<input
				value={username}
				onChange={e => setUsername(e.target.value)}
				placeholder="Логин"
			/>
			<input
				type="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
				placeholder="Пароль"
			/>
			<button onClick={handleLogin}>Войти</button>
			{error && <p>{error}</p>}
		</div>
	);
}
