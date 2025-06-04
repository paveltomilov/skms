import Link from 'next/link';

const Register = () => {
	return (
		<main
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				margin: '50px',
			}}
		>
			<h1>регистрация</h1>
			<Link href={'/login'}>войти!</Link>
			{/* cкорее всего будет как модалка, а не ссылка */}
			<Link href={'/register'}>согласие на обработку ПД!</Link>
		</main>
	);
};

export default Register;
