import {FC} from 'react';
import AuthGuard from '@/shared/components/AuthGuard';

const AdminPage: FC = () => {
    return (
        <AuthGuard requiredRole={'admin'}>
            <h1>
                Панель Админа
            </h1>
        </AuthGuard>
    );
};

export default AdminPage;