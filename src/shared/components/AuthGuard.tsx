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
        if (!loading && user) {
            if (requiredRole && role !== requiredRole && !pathname.startsWith('/access-denied')) {
                router.push('/access-denied');
            }
        }
    }, [loading, requiredRole, role, router, pathname, user]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!user) {
        return <div>Не авторизован</div>;
    }

    if (requiredRole && role !== requiredRole) {
        // Если мы уже на access-denied, показываем children (саму страницу access-denied)
        if (pathname.startsWith('/access-denied')) {
            return <>{children}</>;
        }
        return <div>Перенаправление...</div>;
    }

    return <>{children}</>;
};

export default AuthGuard;