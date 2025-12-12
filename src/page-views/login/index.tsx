'use client';

import styles from './style.module.scss';
import Form from '@/widgets/Form';
import { FC, useCallback, useEffect, useState } from 'react';
import PopupRegistrationDone from '@/entities/PopupRegistrationDone';
import { checkAuth } from '@/shared/lib/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/shared/hooks/useAuth';
import { getDashboardRoute, UserRole } from '@/shared/configs/routes';

const Login: FC = () => {
	const [modalSuccess, setModalSuccess] = useState<boolean>(false);
	const router = useRouter();

	const searchParams = useSearchParams();
	const modeParam = searchParams.get('mode');
	const [isRegisterMode, setIsRegisterMode] = useState(
		modeParam === 'signup',
	);

	const { role } = useAuth();

	const verifyAuth = useCallback(async () => {
		try {
			const { valid } = await checkAuth();
			if (valid && role) {
				const dashboardRoute = getDashboardRoute(role as UserRole);
				router.push(dashboardRoute);
			}
		} catch {
			console.error('Ошибка проверки аутентификации');
		}
	}, [router, role]);

	useEffect(() => {
		verifyAuth();
	}, [verifyAuth]);

	const toggleMode = () => {
		setIsRegisterMode(prev => !prev);
		const newMode = isRegisterMode ? 'login' : 'signup';
		router.replace(`/login?mode=${newMode}`);
	};

	return (
		<main
			className={`${styles.main} ${
				isRegisterMode ? styles.main_registration : ''
			}`}
		>
			<span
				className={`${styles.main_deco_left} ${
					isRegisterMode ? styles.left_registration : ''
				}`}
			></span>
			<span
				className={`${styles.main_deco_right} ${
					isRegisterMode ? styles.right_registration : ''
				}`}
			></span>
			<div
				className={`${styles.main_container} ${
					isRegisterMode ? styles.container_registration : ''
				}`}
			>
				<h2 className={styles.main_container_title}>
					{isRegisterMode ? 'Регистрация' : 'Вход'}
				</h2>
				<Form
					toggleRegisterMode={isRegisterMode ? 'register' : 'login'}
					activateModalSuccess={setModalSuccess}
				/>
				<div className={styles.main_wrap}>
					<span className={styles.main_wrap__text}>
						{isRegisterMode
							? 'Уже зарегистрировались?'
							: 'Еще не зарегистрировались?'}
					</span>
					<button
						className={styles.main_wrap__link}
						onClick={toggleMode}
					>
						{isRegisterMode ? 'Войти' : 'Зарегистрироваться!'}
					</button>
				</div>
				{modalSuccess && (
					<PopupRegistrationDone
						closeModalSuccess={setModalSuccess}
						closeRegistrationMode={setIsRegisterMode}
					/>
				)}
			</div>
		</main>
	);
};

export default Login;
