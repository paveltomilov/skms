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
				width={240}
				height={310}
			/>
			<div className={styles.modal__background} />
			<div className={styles.modal__info}>
				<Image
					src="/images/date_release.png"
					alt="Изображение даты релиза"
					width={193}
					height={53}
				/>
				<span className={styles.modal__info__text}>22.12.2026</span>
			</div>
		</div>
	);
};

export default PopupNotificationDev;
