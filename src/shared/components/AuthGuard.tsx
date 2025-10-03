import {FC} from 'react';
import {useAuth} from '@/shared/hooks/useAuth';

interface IAuthGuard {
    children?: React.ReactNode;
    requiredRole?: 'admin' | 'teacher' | 'student';
}

const AuthGuard: FC<IAuthGuard> = ({children, requiredRole}) => {
    const {role, loading, error} = useAuth(requiredRole);
    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error || !role) {
        return <div>Ошибка доступа</div>; 
    }

    return <>{children}</>;
};

export default AuthGuard;