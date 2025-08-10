'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { checkAuth } from '@/shared/lib/auth';

interface LoginResponse {
	access?: string;
	refresh?: string;
}

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [checking, setChecking] = useState(true);

	useEffect(() => {
		async function verify() {
			const { valid } = await checkAuth();
			if (valid) {
				router.push('/ptk');
			} else {
				setChecking(false);
			}
		}
		verify();
	}, [router]);

	const handleLogin = async () => {
		try {
			const response = await axios.post<LoginResponse>(
				`${urlBase}auth/`,
				{ username, password },
				{
					headers: { 'Content-Type': 'application/json' },
					// withCredentials: true,
				},
			);

			const { access, refresh } = response.data;

			if (access && refresh) {
				if (typeof access === 'string' && typeof refresh === 'string') {
					localStorage.setItem('accessToken', access);
					localStorage.setItem('refreshToken', refresh);
					router.push('/ptk');
				} else {
					setError('Ошибка авторизации: неверный формат токенов');
				}
			} else {
				setError('Ошибка авторизации: токены не получены');
			}
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 401) {
					setError('Неверный логин или пароль');
				} else {
					setError('Ошибка подключения к серверу');
				}
			} else {
				setError('Произошла неизвестная ошибка');
			}
			console.error('Ошибка входа:', err);
		}
	};

	if (checking) return <p>Проверка авторизации...</p>;

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
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
}
