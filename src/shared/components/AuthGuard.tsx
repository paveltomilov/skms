import { FC } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface IAuthGuard {
    children?: React.ReactNode;
    requiredRole?: 'admin' | 'teacher' | 'student';
}

const AuthGuard: FC<IAuthGuard> = ({ children, requiredRole }) => {
    const { user, loading, error, role } = useAuth(requiredRole);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            // Если нет пользователя и не на странице логина - редирект
            if (!user && !pathname.startsWith('/login')) {
                router.push('/login');
                return;
            }

            // Если есть пользователь, но роль не совпадает и не на access-denied
            if (user && requiredRole && role !== requiredRole && !pathname.startsWith('/access-denied')) {
                router.push('/access-denied');
            }
        }
    }, [loading, user, requiredRole, role, router, pathname]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!user) {
        return <div>Перенаправление на страницу входа...</div>;
    }

    if (requiredRole && role !== requiredRole) {
        if (pathname.startsWith('/access-denied')) {
            return <>{children}</>;
        }
        return <div>Проверка доступа...</div>;
    }

    return <>{children}</>;
};

export default AuthGuard;