import { FC, Suspense } from 'react';
import Loading from '../loading';
import RegisterPage from '@/_pages/register';

const Register: FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<RegisterPage />
		</Suspense>
	);
};

export default Register;
