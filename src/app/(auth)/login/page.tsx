'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { checkAuth } from '@/shared/lib/auth';

interface LoginResponse {
	access?: string;
	refresh?: string;
}

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
	const router = useRouter();
	const [form, setForm] = useState({ username: '', password: '' });
	const [error, setError] = useState('');
	const [checking, setChecking] = useState(true);

	const verifyAuth = useCallback(async () => {
		const { valid } = await checkAuth();
		if (valid) router.push('/ptk');
		setChecking(false);
	}, [router]);

	useEffect(() => {
		verifyAuth();
	}, [verifyAuth]);

	const handleLogin = async () => {
		try {
			const {
				data: { access, refresh },
			} = await axios.post<LoginResponse>(`${urlBase}auth/`, form, {
				headers: { 'Content-Type': 'application/json' },
			});

			if (!access || !refresh) {
				throw new Error('Токены не получены');
			}

			localStorage.setItem('accessToken', access);
			localStorage.setItem('refreshToken', refresh);
			router.push('/ptk');
		} catch (err) {
			let errorMessage = 'Произошла неизвестная ошибка';

			if (axios.isAxiosError(err)) {
				errorMessage =
					err.response?.status === 401
						? 'Неверный логин или пароль'
						: 'Ошибка подключения к серверу';
			} else if (err instanceof Error) {
				errorMessage = err.message;
			}

			setError(errorMessage);
			console.error('Ошибка входа:', err);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	if (checking) return <p>Проверка авторизации...</p>;

	return (
		<div>
			<input
				name="username"
				value={form.username}
				onChange={handleChange}
				placeholder="Логин"
			/>
			<input
				type="password"
				name="password"
				value={form.password}
				onChange={handleChange}
				placeholder="Пароль"
			/>
			<button onClick={handleLogin}>Войти</button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
}
