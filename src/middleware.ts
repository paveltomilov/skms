import axios, {AxiosError, AxiosResponse} from 'axios';
import {NextRequest, NextResponse} from 'next/server';
import {jwtDecode} from 'jwt-decode';
import {saveAccessToken} from '@/shared/lib/auth';
import {RefreshResponse} from '@/shared/types/typesAuth';

const urlBase:string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

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
const ADMIN_DASHBOARD = '/ptk';

// Функция для редиректа на логин с очисткой кук
function redirectToLogin(request: NextRequest): NextResponse {
    const res = NextResponse.redirect(new URL(LOGIN_PATH, request.url));
    res.cookies.delete('accessToken');
    res.cookies.delete('refreshToken');
    return res;
}

export async function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // Если токена нет — перенаправляем на логин
    if (!accessToken) {
        if (!request.nextUrl.pathname.startsWith(LOGIN_PATH)) {
            return redirectToLogin(request);
        }
        return NextResponse.next();
    }

    if (!urlBase) {
        console.error('API базовго URL не задано');
        return redirectToLogin(request);
    }

    let role: string | null = null;
    let currentAccessToken = accessToken; // Используем для повторных запросов
    let response: AxiosResponse<User> | undefined;

    try {
        // Декодируем токен для получения user_id
        const decoded = jwtDecode<JwtPayload>(currentAccessToken);
        const userId = decoded.user_id;

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
                        // Сохраняем новый access-токен в куку
                        saveAccessToken(newAccessToken);

                        // Обновляем локальную переменную и повторяем запрос
                        currentAccessToken = newAccessToken;
                        response = await axios.get<User>(`${urlBase}/users/${userId}`, {
                            headers: { Authorization: `Bearer ${currentAccessToken}` },
                        });
                    }
                } catch (refreshError) {
                    // Если refresh не удался — очищаем куки и редиректим
                    console.error('Ошибка при обновлении токена:', refreshError);
                    return redirectToLogin(request);
                }
            } else {
                // Другая ошибка — выбрасываем
                throw error;
            }
        }

        role = response?.data?.role ?? null;

    } catch (error) {
        console.error('Ошибка в middleware при получении роли:', error);
        // При любой другой ошибке — очищаем куки и перенаправляем на логин
        return redirectToLogin(request);
    }

    const url = request.nextUrl.clone();

    // Логика перенаправления по ролям
    if (role === 'teacher') {
        if (!url.pathname.startsWith(TEACHER_DASHBOARD)) {
            url.pathname = TEACHER_DASHBOARD;
            return NextResponse.redirect(url);
        }
    } else if (role === 'student') {
        if (!url.pathname.startsWith(STUDENT_DASHBOARD)) {
            url.pathname = STUDENT_DASHBOARD;
            return NextResponse.redirect(url);
        }
    } else if (role === 'admin') {
        if (!url.pathname.startsWith(ADMIN_DASHBOARD)) {
            url.pathname = ADMIN_DASHBOARD;
            return NextResponse.redirect(url);
        }
    } else {
        redirectToLogin(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
        '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
    ],
};