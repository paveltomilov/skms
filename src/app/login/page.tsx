import { FC, Suspense } from 'react';
import Loading from '../loading';
import LoginPage from '@/_pages/login';

const Login: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<LoginPage />
		</Suspense>
	);
};

export default Login;
