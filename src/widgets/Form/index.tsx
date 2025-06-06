'use client';

import { useForm } from '@/shared/hooks/useForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEventHandler } from 'react';

const Form = () => {
	const router = useRouter();
	const { values, handleChange } = useForm({ email: '', password: '' });

	const { email, password } = values;

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();

		const res = await signIn('credentials', {
			username: email,
			password,
			redirect: false,
		});

		if (res && !res.error) {
			router.push('/');
		} else {
			console.log(res);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '500px',
				gap: '20px',
			}}
		>
			<input
				type="text"
				name="email"
				required
				onChange={handleChange}
				value={email}
				placeholder="E-mail"
			/>
			<input
				type="password"
				name="password"
				required
				onChange={handleChange}
				value={password}
			/>
			<button type="submit">Войти</button>
		</form>
	);
};

export default Form;
