import { FC, Suspense } from 'react';
import Zra from '@/_pages/zra';
import Loading from '../loading';

const Main: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Zra />
		</Suspense>
	);
};

export default Main;
