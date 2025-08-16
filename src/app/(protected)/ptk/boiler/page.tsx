import { FC, Suspense } from 'react';
import Loading from '@/app/loading';
import BoilerUnitPage from '@/_pages/boiler-unit';

const Turbine: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<BoilerUnitPage />
		</Suspense>
	);
};

export default Turbine;
