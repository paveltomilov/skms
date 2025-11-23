import {FC, Suspense} from 'react';
import Loading from '../../loading';
import PolicyPage from '@/pages/policy';

const Policy: FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <PolicyPage/>
        </Suspense>
    );
};

export default Policy;