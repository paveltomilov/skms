import axios, { AxiosError } from 'axios';
import { User } from '@/shared/types/users';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUsers(): Promise<User[]> {
  const access = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  if (!access) {
    throw new Error('отсутствует токен');
  };

  try {
    const response = await axios.get<User[]>(`${urlBase}/users/`, {
      headers: {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = axiosError.response?.data 
      ? JSON.stringify(axiosError.response.data)
      : 'Failed to fetch';
    throw new Error(message);
  };
};