import axios, { AxiosError } from 'axios';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface StudentStatistics {
    active_simulations: number;
    failed_simulations: number;
    finished_simulations: number;
    total_simulations: number
}

export async function getStudentStatistics(id:number): Promise<StudentStatistics> {
  const access = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
//   
  if (!access) {
    throw new Error('отсутствует токен');
  };

  try {
    const response = await axios.get<StudentStatistics>(`${urlBase}/statistics/student/${id}/`, {
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