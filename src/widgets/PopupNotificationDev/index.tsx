import { FC } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

interface Props {
	className?: string;
}

const PopupNotificationDev: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.modal)}>
			<img
				className={styles.modal__img}
				src="/images/worker.png"
				alt="Изображение рабочего"
			/>
			<div className={styles.modal__background} />
			<div className={styles.modal__info}>
				<img
					src="/images/date_release.png"
					alt="Изображение даты релиза"
				/>
				<span className={styles.modal__info__text}>
					Планируемая дата реальзации
				</span>
			</div>
		</div>
	);
};

export default PopupNotificationDev;
