import {FC, Suspense} from 'react';
import Loading from './loading';
import LandingPage from '@/pages/landing';

const Landing: FC = () => {
	
	return (
		<Suspense fallback={<Loading />}>
			<LandingPage/>
		</Suspense>
	);
};

export default Landing;
