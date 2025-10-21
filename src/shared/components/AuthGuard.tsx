// shared/components/AuthGuard.tsx
import { FC } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';

interface IAuthGuard {
    children?: React.ReactNode;
    requiredRole?: 'admin' | 'teacher' | 'student';
}

const AuthGuard: FC<IAuthGuard> = ({ children, requiredRole }) => {
    const { user, loading, error, role } = useAuth(requiredRole);

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
                <div>Ошибка: {error}</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Перенаправление на страницу входа...</div>
            </div>
        );
    }

    if (requiredRole && role !== requiredRole) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div>Доступ запрещен для вашей роли</div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;