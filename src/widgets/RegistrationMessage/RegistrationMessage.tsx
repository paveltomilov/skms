import { LoginFormData } from '@/shared/types/login';
import styles from './styles.module.scss';

const RegistrationMessage = (data: LoginFormData) => {
	return (
		<div className={styles.response}>
			<p className={styles.response__message}>
				✔ Пользователь успешно зарегестрирован
			</p>
			<ul className={styles.response__list}>
				<li className={styles.response__item}>
					Email ученика: <b>{data.email}</b>
				</li>
				<li className={styles.response__item}>
					ФИО: <b>{data.first_name} {data.last_name}</b>
				</li>
				<li className={styles.response__item}>
					Пароль: <b>{data.password}</b>
				</li>
			</ul>
			<p className={styles.response__warning}>
				Не забудьте сохранить пароль
			</p>
		</div>
	);
};

export default RegistrationMessage;
