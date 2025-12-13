import {FC, Suspense} from 'react';
import Loading from '@/app/loading';
import StudentPage from '@/pages/student-page';

const StudentDashboardPage:FC = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <StudentPage/>
        </Suspense>
    );
};

export default StudentDashboardPage;