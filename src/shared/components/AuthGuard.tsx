import { FC } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface IAuthGuard {
    children?: React.ReactNode;
    requiredRole?: 'admin' | 'teacher' | 'student';
}

const AuthGuard: FC<IAuthGuard> = ({ children, requiredRole }) => {
    const { user, loading, error, role } = useAuth(requiredRole);
    const router = useRouter();

    useEffect(() => {
        // Дополнительная проверка на стороне клиента
        if (!loading && requiredRole && role !== requiredRole) {
            router.push('/access-denied');
        }
    }, [loading, requiredRole, role, router]);

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
        return <div>Проверка доступа...</div>;
    }

    return <>{children}</>;
};

export default AuthGuard;