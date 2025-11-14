import { getCookie } from 'cookies-next';
import { Role } from '../types/users';

interface UserCookies {
	firstName: string;
	lastName: string;
	role: Role;
}

export const useUserCookies = (): UserCookies => {
	const firstName = getCookie('first_name');
	const lastName = getCookie('last_name');
	const role_ = getCookie('role');
	const role =
		role_?.toString() === 'admin' ? 'admin' :
		role_?.toString() === 'student' ? 'student' :
		role_?.toString() === 'teacher' ? 'teacher' :
		'';
		
	return {
		firstName: firstName?.toString() || '',
		lastName: lastName?.toString() || '',
		role: role
	};
};
