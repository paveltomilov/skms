import { User } from '@/shared/types/users';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUsers(): Promise<User[]> {
	const access = localStorage.getItem('accessToken');

	try {
		const response = await fetch(`${urlBase}/users/`, {
			method: 'GET',
			headers: { 'Authorization': `Bearer ${access}` },
		});

		if (!response.ok) {
			return  [];
		}

		const responseData = (await response.json()) as User[];
        return responseData;
		
	} catch {
		return [];
	};
};

