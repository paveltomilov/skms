import {FC, Suspense} from 'react';
import Loading from '@/app/loading';
import AdminPage from '@/_pages/admin-page';

const AdminDashboardPage:FC = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <AdminPage/>
        </Suspense>
    );
};

export default AdminDashboardPage;