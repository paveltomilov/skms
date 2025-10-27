import { FC, Suspense } from 'react';
import Loading from './loading';
import LandingLayout from '../_pages/landing/layout';
import LandingPage from '../_pages/landing';

const Landing: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<LandingPage />
			{/* <LandingLayout /> */}
			{/* <h1>Лендинг</h1> */}
			{/* <Link href="/login">Вход</Link> */}
		</Suspense>
	);
};

export default Landing;
