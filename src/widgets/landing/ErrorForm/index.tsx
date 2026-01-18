import { FC } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const ErrorForm: FC = () => {
	return (
		<div className={styles.error}>
			<div className={styles.error__info}>
				<h2 className={styles.error__title}>Что-то пошло не так…</h2>
				<p className={`${styles.error__top} ${styles.error__descr}`}>
					Не удалось отправить данные <br />
					<span className={styles.error__descr__mobile}>
						Пожалуйста,
					</span>
					попробуйте ещё раз чуть позже
				</p>
				<p className={`${styles.error__bottom} ${styles.error__descr}`}>
					Если ошибка повторяется — мы&nbsp;рядом:
				</p>
				<Link
					className={styles.error__mail}
					href="mailto:Skillmanagment@mail.ru"
				>
					Skillmanagment@mail.ru
				</Link>
			</div>
			<div className={styles.error__img}>
				<Image
					className={styles.error__img__size}
					src="/images/error.png"
					alt="Ошибка при отправке данных"
					width={268}
					height={274}
				/>
			</div>
		</div>
	);
};

export default ErrorForm;
