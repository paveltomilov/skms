import { FC } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import cn from 'classnames';

interface Props {
	className?: string;
}

const PopupNotificationDev: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.modal)}>
			<Image
				className={styles.modal__img}
				src="/images/worker.png"
				alt="Изображение рабочего"
				width={200}
				height={200}
			/>
			<div className={styles.modal__background} />
			<div className={styles.modal__info}>
				<Image
					src="/images/date_release.png"
					alt="Изображение даты релиза"
					width={100}
					height={100}
				/>
				<span className={styles.modal__info__text}>
					Планируемая дата реальзации
				</span>
			</div>
		</div>
	);
};

export default PopupNotificationDev;
