import {FC} from 'react';
import AuthGuard from '@/shared/components/AuthGuard';

const TeacherPage: FC = () => {
    return (
        <AuthGuard requiredRole={'teacher'}>
            <h1>
                Панель учителя
            </h1>
        </AuthGuard>
    );
};

export default TeacherPage;