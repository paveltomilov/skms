import {usePathname, useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getCookie, setCookie, deleteCookie } from 'cookies-next'; // Импорт из cookies-next
import { RefreshResponse } from '@/shared/types/typesAuth';

const urlBase: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

interface JwtPayload {
    user_id: number;
}

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'teacher' | 'student';
}

const LOGIN_PATH = '/login';
const TEACHER_DASHBOARD = '/teacher-dashboard';
const STUDENT_DASHBOARD = '/student-dashboard';
const ADMIN_DASHBOARD = '/admin';

export const useAuth = (requiredRole?: 'admin' | 'teacher' | 'student') => {
    const router = useRouter();
    const pathname = usePathname();
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            // Используем getCookie для получения токенов
            const accessToken = getCookie('accessToken') as string | undefined;
            const refreshToken = getCookie('refreshToken') as string | undefined;

            if (!accessToken) {
                if (!pathname.startsWith(LOGIN_PATH)) {
                    await router.push(LOGIN_PATH);
                }
                setLoading(false);
                return;
            }

            if (!urlBase) {
                setError('API URL не настроен');
                setLoading(false);
                return;
            }

            let currentAccessToken: string = accessToken;
            let response: AxiosResponse<User> | undefined;

            try {
                // Декодируем токен для получения user_id
                const decoded: JwtPayload = jwtDecode<JwtPayload>(currentAccessToken);
                const userId: number = decoded.user_id;

                // Пытаемся запросить пользователя по ID
                try {
                    response = await axios.get<User>(`${urlBase}/users/${userId}`, {
                        headers: { Authorization: `Bearer ${currentAccessToken}` },
                    });
                } catch (error: unknown) {
                    // Если ошибка 401 (токен истёк), пытаемся обновить
                    if (error instanceof AxiosError && error.response?.status === 401 && refreshToken) {
                        try {
                            const refreshRes = await axios.post<RefreshResponse>(`${urlBase}/auth/refresh/`, {
                                refresh: refreshToken,
                            });
                            const newAccessToken: string | undefined = refreshRes.data.access;
                            if (newAccessToken) {
                                // Сохраняем новый access-токен в куку с помощью setCookie
                                setCookie('accessToken', newAccessToken, { path: '/', httpOnly: false }); // httpOnly: false для клиентского доступа

                                // Обновляем локальную переменную и повторяем запрос
                                currentAccessToken = newAccessToken;
                                response = await axios.get<User>(`${urlBase}/users/${userId}`, {
                                    headers: { Authorization: `Bearer ${currentAccessToken}` },
                                });
                            }
                        } catch  {
                            // Очищаем куки с помощью deleteCookie и редиректим
                            deleteCookie('accessToken', { path: '/' });
                            deleteCookie('refreshToken', { path: '/' });
                            router.push(LOGIN_PATH);
                            setLoading(false);
                            return;
                        }
                    } else {
                        throw error;
                    }
                }

                const userRole = response?.data?.role ?? null;
                setRole(userRole);

                // Логика перенаправления по ролям (только если роль не совпадает с требуемой)
                if (requiredRole && userRole !== requiredRole) {
                    if (userRole === 'teacher' && !pathname.startsWith(TEACHER_DASHBOARD)) {
                        router.push(TEACHER_DASHBOARD);
                    } else if (userRole === 'student' && !pathname.startsWith(STUDENT_DASHBOARD)) {
                        router.push(STUDENT_DASHBOARD);
                    } else if (userRole === 'admin' && !pathname.startsWith(ADMIN_DASHBOARD)) {
                        router.push(ADMIN_DASHBOARD);
                    } else {
                        router.push(LOGIN_PATH); // Если роль неизвестна
                    }
                }
            } catch {
                setError('Ошибка аутентификации');
                // Очищаем куки и редиректим
                deleteCookie('accessToken', { path: '/' });
                deleteCookie('refreshToken', { path: '/' });
                await router.push(LOGIN_PATH);
            }

            setLoading(false);
        };

        checkAuth();
    }, [pathname, requiredRole, router]);

    return { role, loading, error };
};
