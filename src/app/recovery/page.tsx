import { FC, Suspense } from 'react';
import Loading from '../loading';
import RecoveryPage from '@/_pages/recovery';

const Recovery: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<RecoveryPage />
		</Suspense>
	);
};

export default Recovery;
