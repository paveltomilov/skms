import { FC, Suspense } from 'react';
import BoilerUnitPage from '@/_pages/boiler-unit';
import Loading from '../loading';

const Ptk: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<BoilerUnitPage />
		</Suspense>
	);
};

export default Ptk;
