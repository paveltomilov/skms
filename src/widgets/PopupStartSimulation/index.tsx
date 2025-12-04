import styles from './styles.module.scss';
import { FC } from 'react';

export const PopupStartSimulation: FC = () => {
	return (
		<div className={styles.popup}>
			<div className={styles.message}>
				Получена новая неисправность. Симуляция запущена.
			</div>
		</div>
	);
};
