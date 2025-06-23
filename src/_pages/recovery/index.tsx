import Link from 'next/link';

const Recovery = () => {
	return (
		<main
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '10px',
				margin: '50px',
			}}
		>
			<h1>восстановление пароля</h1>
			<Link href={'/login'}>вспомнил пароль? Заходи</Link>
		</main>
	);
};

export default Recovery;
