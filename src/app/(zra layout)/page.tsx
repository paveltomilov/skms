import { FC, Suspense } from 'react';
import Zra from '@/_pages/zra';

const Main: FC = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Zra />
		</Suspense>
	);
};

export default Main;
