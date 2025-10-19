// src/shared/hooks/useUserCookies.ts
'use client';

import { getCookie } from 'cookies-next';

type UserRole = 'admin' | 'student';

interface UserCookies {
	firstName: string;
	lastName: string;
	role: UserRole | string; // строка, но с предпочтительными значениями
	isLoaded: boolean;
}

export const useUserCookies = (): UserCookies => {
	const firstName = getCookie('userFirstName');
	const lastName = getCookie('userLastName');
	const role = getCookie('userRole');

	return {
		firstName: firstName?.toString() || '',
		lastName: lastName?.toString() || '',
		role: role?.toString() || '',
		isLoaded: !!firstName && !!lastName && !!role,
	};
};
