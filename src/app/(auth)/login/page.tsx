import {Suspense} from 'react';
import Loading from '@/app/loading';
import Login from '@/_pages/login';

export default function LoginPage() {
    return (
		<Suspense fallback={<Loading />}>
			<Login/>
		</Suspense>
	);
}
