import { FC, Suspense } from 'react';
import TurbineUnitPage from '@/_pages/turbine-unit/index';
import Loading from '../../loading';

const Ptk: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<TurbineUnitPage />
		</Suspense>
	);
};

export default Ptk;
