import { FC, Suspense } from 'react';
import TurbineUnitPage from '@/_pages/turbine-unit';
import Loading from '@/app/loading';

const Turbine: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<TurbineUnitPage />
		</Suspense>
	);
};

export default Turbine;
