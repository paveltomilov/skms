import { StudentStatistics } from '@/shared/types/statistics';
import axios, { AxiosError } from 'axios';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getStudentStatistics(id:number): Promise<StudentStatistics> {
  const access = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  if (!access) {
    throw new Error('отсутствует токен');
  };

  try {
    const response = await axios.get<StudentStatistics>(`${urlBase}/statistics/student/${id}/`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const message = axiosError.response?.data 
      ? JSON.stringify(axiosError.response.data)
      : 'Failed to fetch';
    throw new Error(message);
  };
};