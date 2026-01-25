import { FC } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

const SuccesForm: FC = () => {
	return (
		<div className={styles.succes}>
			<div className={styles.succes__info}>
				<h2 className={styles.succes__title}>
					<span className={styles.succes__title__mobile}>
						Спасибо,
					</span>
					мы получили вашу заявку
				</h2>
				<p className={styles.succes__descr}>
					Наш специалист свяжется с вами в ближайшее время, чтобы
					уточнить детали и помочь с выбором решения
				</p>
			</div>
			<div className={styles.succes__img}>
				<Image
					className={styles.succes__img__size}
					src="/images/succes.png"
					alt="Данные успешно отправлены"
					width={268}
					height={274}
				/>
			</div>
		</div>
	);
};

export default SuccesForm;
