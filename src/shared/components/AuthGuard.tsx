'use client';

import { FC, useEffect } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import {getDashboardRoute, isPublicRoute} from '@/shared/configs/routes';

interface IAuthGuard {
    children?: React.ReactNode;
    requiredRole?: 'admin' | 'teacher' | 'student';
}

const AuthGuard: FC<IAuthGuard> = ({ children, requiredRole }) => {
    const { loading, error, role } = useAuth(requiredRole);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            // Если нет авторизации и не на публичной странице - редирект
            if (error && !isPublicRoute(pathname)) {
                router.push('/login');
                return;
            }

            // Если есть роль, но не совпадает с требуемой - редирект на dashboard роли
            if (role && requiredRole && role !== requiredRole) {
                const dashboardRoute = getDashboardRoute(role);
                router.push(dashboardRoute);
                return;
            }
        }
    }, [loading, error, role, requiredRole, router, pathname]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Загрузка...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Перенаправление на страницу входа...</div>
            </div>
        );
    }

    if (requiredRole && role !== requiredRole) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Проверка доступа...</div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;