import { FC, Suspense } from 'react';
import Loading from '../../loading';
import TrainingPage from '@/_pages/training';

const Training: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<TrainingPage />
		</Suspense>
	);
};

export default Training;
