import {FC, Suspense} from 'react';
import Loading from '@/app/loading';
import TeacherPage from '@/_pages/teacher-page';

const TeacherDashboardPage:FC = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <TeacherPage/>
        </Suspense>
    );
};

export default TeacherDashboardPage;