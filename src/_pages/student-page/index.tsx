import {FC} from 'react';
import AuthGuard from '@/shared/components/AuthGuard';

const StudentPage: FC = () => {
    return (
        <AuthGuard requiredRole={'student'}>
            <h1>
                Панель Студента
            </h1>
        </AuthGuard>
    );
};

export default StudentPage;