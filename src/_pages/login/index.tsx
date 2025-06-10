import Form from '@/widgets/Form';
import Link from 'next/link';

const Login = () => {
	return (
		<main
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				margin: '50px',
			}}
		>
			<h1>вход/регистрация</h1>
			<Form />

			<Link href={'/recovery'}>забыли пароль?</Link>
			<Link href={'/'}>в тренажер!</Link>
		</main>
	);
};

export default Login;
