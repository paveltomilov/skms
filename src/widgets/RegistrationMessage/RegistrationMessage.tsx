'use client';
import { LoginFormData } from '@/shared/types/login';
import styles from './styles.module.scss';
import { doFirstLatterBig } from '@/shared/utils/doFirstLatterBig/doFirstLatterBig';
import Success from '@/shared/UI/icons/Success';
import Button from '@/shared/UI/Button';
import Copy from '@/shared/UI/icons/Copy/Copy';

const RegistrationMessage = (data: LoginFormData) => {
	async function handleCopyPassword() {
		const password = data.password;

		await navigator.clipboard
			.writeText(password)
			.then(() => console.log('Пароль скопирован'))
			.catch(err =>
				console.error('Пароль не скопирован, произошла ошибка', err),
			);
	}
	return (
		<div className={styles.response}>
			<div className={styles.response__top}>
				<Success />
				<p className={styles.response__message}>
					Регистрация ученика завершена
				</p>
			</div>

			<ul className={styles.response__list}>
				<li className={styles.response__item}>
					<span className={styles.response__line}>Имя:</span>
					<b>{doFirstLatterBig(data.first_name)}</b>
				</li>
				<li className={styles.response__item}>
					<span className={styles.response__line}>Фамилия:</span>
					<b>{doFirstLatterBig(data.last_name)}</b>
				</li>

				<li className={styles.response__item}>
					<span className={styles.response__line}>Email:</span>
					<b>{data.email}</b>
				</li>
				<li className={styles.response__item}>
					<span className={styles.response__line}>Пароль:</span>
					<b id="password">{data.password}</b>
					<Button
						title="Скопировать в буфер обмена"
						className={styles.response__btn}
						width={32}
						height={32}
						onClick={handleCopyPassword}
						icon={<Copy />}
					/>
				</li>
			</ul>
		</div>
	);
};

export default RegistrationMessage;
