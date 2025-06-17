import { FC, Suspense } from 'react';
import ZraPage from '@/_pages/zra';
import Loading from '../loading';

const Zra: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<ZraPage />
		</Suspense>
	);
};

export default Zra;
