// shared/hooks/useAuth.ts
import {usePathname, useRouter} from 'next/navigation';
import {useCallback, useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {jwtDecode} from 'jwt-decode';
import {checkAuth, logout} from '@/shared/lib/auth';

const urlBase: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

interface JwtPayload {
    user_id: number;
    role?: 'admin' | 'teacher' | 'student';
}

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'teacher' | 'student';
}

export const useAuth = (requiredRole?: 'admin' | 'teacher' | 'student') => {
    const router = useRouter();
    const pathname = usePathname();
    const [state, setState] = useState<{
        role: string | null;
        loading: boolean;
        error: string | null;
        user: User | null;
    }>({
        role: null,
        loading: true,
        error: null,
        user: null,
    });

    const fetchUserData = useCallback(async (): Promise<User | null> => {
        try {
            // Используем вашу готовую функцию проверки аутентификации
            const { valid } = await checkAuth();

            if (!valid) {
                return null;
            }

            // Если токены валидны, получаем accessToken и данные пользователя
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                return null;
            }

            const decoded = jwtDecode(accessToken) as JwtPayload;
            const response = await axios.get<User>(
                `${urlBase}/users/${decoded.user_id}`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 401) {
                return null;
            }
            throw error;
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const checkAuthAndFetchUser = async () => {
            if (!isMounted) return;

            try {
                setState(prev => ({ ...prev, loading: true }));

                // Используем вашу функцию checkAuth для проверки токенов
                const { valid } = await checkAuth();

                if (!valid) {
                    const isPublicRoute =
                        pathname.startsWith('/login') ||
                        pathname === '/';

                    if (!isPublicRoute) {
                        router.push('/login');
                    }

                    if (isMounted) {
                        setState({
                            role: null,
                            loading: false,
                            error: isPublicRoute ? null : 'Требуется авторизация',
                            user: null
                        });
                    }
                    return;
                }

                const userData = await fetchUserData();

                // Не удалось получить данные пользователя
                if (!userData) {
                    logout();

                    if (!pathname.startsWith('/login')) {
                        router.push('/login');
                    }

                    if (isMounted) {
                        setState({
                            role: null,
                            loading: false,
                            error: 'Ошибка аутентификации',
                            user: null
                        });
                    }
                    return;
                }

                // Проверяем доступ по роли
                if (requiredRole && userData.role !== requiredRole) {
                    // Редирект на соответствующую dashboard для роли пользователя
                    const roleDashboard = {
                        admin: '/admin-dashboard',
                        teacher: '/teacher-dashboard',
                        student: '/ptk'
                    }[userData.role] || '/';

                    if (pathname !== roleDashboard) {
                        router.push(roleDashboard);
                        return;
                    }
                }

                // Автоматический редирект на dashboard после логина с главной страницы
                if (!requiredRole && pathname === '/') {
                    const roleDashboard = {
                        admin: '/admin-dashboard',
                        teacher: '/teacher-dashboard',
                        student: '/ptk'
                    }[userData.role] || '/';

                    if (pathname !== roleDashboard) {
                        router.push(roleDashboard);
                        return;
                    }
                }

                if (isMounted) {
                    setState({
                        role: userData.role,
                        loading: false,
                        error: null,
                        user: userData
                    });
                }

            } catch (error) {
                console.error('Auth error:', error);

                if (isMounted) {
                    setState({
                        role: null,
                        loading: false,
                        error: 'Ошибка аутентификации',
                        user: null
                    });
                }

                logout();

                if (!pathname.startsWith('/login')) {
                    router.push('/login');
                }
            }
        };

        checkAuthAndFetchUser();

        return () => {
            isMounted = false;
        };
    }, [pathname, requiredRole, router, fetchUserData]);

    return state;
};