export const DASHBOARD_ROUTES = {
    admin: '/admin-dashboard',
    teacher: '/teacher-dashboard',
    student: '/ptk'
} as const;

export type UserRole = keyof typeof DASHBOARD_ROUTES;

export const PUBLIC_ROUTES = [
    '/login',
    '/'
] as const;

// Вспомогательная функция для получения dashboard по роли
export const getDashboardRoute = (role: UserRole | null): string => {
    if (role !== null) {
        return DASHBOARD_ROUTES[role];
    }
    return 'student';
};

// Функция проверки публичного маршрута
export const isPublicRoute = (pathname: string): boolean => {
    return PUBLIC_ROUTES.some(route =>
        pathname === route || pathname.startsWith(`${route}/`)
    );
};