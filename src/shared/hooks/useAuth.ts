import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from 'cookies-next';
import { checkAuth, logout } from '@/shared/lib/auth'; 

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
const ACCESS_DENIED = '/access-denied';
const TEACHER_DASHBOARD = '/teacher-dashboard';
const STUDENT_DASHBOARD = '/student-dashboard';
const ADMIN_DASHBOARD = '/admin';

// Функция для редиректов
const getRedirectPath = (
    userRole: string | null,
    currentPath: string,
    requiredRole?: string
): string | null => {
    // Если пользователь не аутентифицирован
    if (!userRole) {
        return currentPath.startsWith(LOGIN_PATH) ? null : LOGIN_PATH;
    }

    // Если требуется определенная роль, но у пользователя другая
    if (requiredRole && userRole !== requiredRole) {
        return currentPath.startsWith(ACCESS_DENIED) ? null : ACCESS_DENIED;
    }

    // Автоматический редирект по роли только с главной страницы
    if (currentPath === '/') {
        const rolePaths: Record<string, string> = {
            teacher: TEACHER_DASHBOARD,
            student: STUDENT_DASHBOARD,
            admin: ADMIN_DASHBOARD,
        };
        return rolePaths[userRole] || LOGIN_PATH;
    }

    return null;
};

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
                if (!urlBase) {
                    throw new Error('API URL не настроен');
                }

                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = getCookie('refreshToken') as string | undefined;

                if (!accessToken || !refreshToken) {
                    const shouldRedirect = !pathname.startsWith(LOGIN_PATH);
                    if (isMounted) {
                        setState({
                            role: null,
                            loading: false,
                            error: shouldRedirect ? 'Требуется авторизация' : null,
                            user: null
                        });
                    }
                    if (shouldRedirect) {
                        await router.push(LOGIN_PATH);
                    }
                    return;
                }

                const userData = await fetchUserData();

                // Не удалось аутентифицировать
                if (!userData) {

                    logout();

                    const shouldRedirect = !pathname.startsWith(LOGIN_PATH);
                    if (isMounted) {
                        setState({
                            role: null,
                            loading: false,
                            error: 'Ошибка аутентификации',
                            user: null
                        });
                    }
                    if (shouldRedirect) {
                        await router.push(LOGIN_PATH);
                    }
                    return;
                }

                // Проверяем необходимость редиректа
                const redirectPath = getRedirectPath(userData.role, pathname, requiredRole);
                if (redirectPath && !pathname.startsWith(redirectPath)) {
                    await router.push(redirectPath);
                    return; // Прерываем выполнение, т.к. будет редирект
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

                if (!pathname.startsWith(LOGIN_PATH)) {
                    await router.push(LOGIN_PATH);
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