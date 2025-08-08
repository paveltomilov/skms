'use client';

import styles from './style.module.scss';
import Form from '@/widgets/Form';
import {FC, useState} from 'react';
import PopupRegistrationDone from '@/entities/PopupRegistrationDone';

const Login: FC = () => {
	const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);
	const [modalSuccess, setModalSuccess] = useState<boolean>(false);

	const handleToggleRegisterMode = () => setIsRegisterMode(!isRegisterMode);

	return (
		<main className={`${styles.main} ${isRegisterMode ? styles.main_registration : ''}`}>
			<span className={`${styles.main_deco_left} ${isRegisterMode ? styles.left_registration : ''}`}></span>
			<span className={`${styles.main_deco_right} ${isRegisterMode ? styles.right_registration : ''}`}></span>
			<div className={`${styles.main_container} ${isRegisterMode ? styles.container_registration : ''}`}>
				<h2 className={styles.main_container_title}>
					{isRegisterMode ? 'Регистрация' : 'Вход'}
				</h2>
				<Form toggleRegisterMode={isRegisterMode} activateModalSuccess={setModalSuccess} />
				<div className={styles.main_wrap}>
					<span className={styles.main_wrap__text}>
						{isRegisterMode ? 'Уже зарегистрировались?' : 'Еще не зарегистрировались?'}
					</span>
					<button
						className={styles.main_wrap__link}
						onClick={handleToggleRegisterMode}
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
