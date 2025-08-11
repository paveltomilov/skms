import { FC, Suspense } from 'react';
import Loading from './loading';
import Link from 'next/link';

const Landing: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<h1>Лендинг</h1>
			<Link href="/login">Вход</Link>
		</Suspense>
	);
};

export default Landing;
