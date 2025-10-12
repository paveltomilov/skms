import { useEffect } from 'react';

export const useUserCookies = () => {
	// Получение значения из cookies
	const getCookie = (name: string): string => {
		if (typeof document === 'undefined') return '';

		const cookies = document.cookie.split(';');
		for (const cookie of cookies) {
			const [cookieName, cookieValue] = cookie.trim().split('=');
			if (cookieName === name) {
				return decodeURIComponent(cookieValue);
			}
		}
		return '';
	};

	// Установка значения в cookies
	const setCookie = (name: string, value: string, days: number = 7) => {
		if (typeof document === 'undefined') return;

		const expires = new Date();
		expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
		document.cookie = `${name}=${encodeURIComponent(
			value,
		)}; expires=${expires.toUTCString()}; path=/`;
	};

	// Сохранение данных пользователя в cookies
	const saveUserData = (userData: {
		first_name: string;
		last_name: string;
		role: string;
	}) => {
		setCookie('user_first_name', userData.first_name);
		setCookie('user_last_name', userData.last_name);
		setCookie('user_role', userData.role);

		// Также сохраняем в localStorage для обратной совместимости
		localStorage.setItem(
			'user_name',
			`${userData.first_name} ${userData.last_name}`,
		);
		localStorage.setItem(
			'user_isstaff',
			userData.role === 'admin' ? 'true' : 'false',
		);
	};

	// Автоматическая синхронизация cookies → localStorage при загрузке
	useEffect(() => {
		// Если в cookies есть данные, но в localStorage нет - синхронизируем
		const cookieFirstName = getCookie('user_first_name');
		const cookieLastName = getCookie('user_last_name');
		const cookieRole = getCookie('user_role');

		if (cookieFirstName && cookieLastName) {
			// Синхронизируем с localStorage
			if (!localStorage.getItem('user_name')) {
				localStorage.setItem(
					'user_name',
					`${cookieFirstName} ${cookieLastName}`,
				);
			}
			if (!localStorage.getItem('user_isstaff') && cookieRole) {
				localStorage.setItem(
					'user_isstaff',
					cookieRole === 'admin' ? 'true' : 'false',
				);
			}
		}
	}, []);

	// Очистка данных
	const clearUserData = () => {
		const cookies = ['user_first_name', 'user_last_name', 'user_role'];
		cookies.forEach(cookie => {
			document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
		});
	};

	return {
		saveUserData,
		clearUserData,
	};
};
