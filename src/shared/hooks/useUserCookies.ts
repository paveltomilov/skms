import { getCookie } from 'cookies-next';

interface UserCookies {
	firstName: string;
	lastName: string;
	role: string;
}

export const useUserCookies = (): UserCookies => {
	const firstName = getCookie('first_name');
	const lastName = getCookie('last_name');
	const role = getCookie('role');

	return {
		firstName: firstName?.toString() || '',
		lastName: lastName?.toString() || '',
		role: role?.toString() || '',
	};
};
