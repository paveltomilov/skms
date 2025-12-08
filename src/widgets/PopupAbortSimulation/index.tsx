import styles from './styles.module.scss';
import { FC } from 'react';

export const PopupAbortSimulation: FC = () => {
	return (
		<div className={styles.popup}>
			<div className={styles.message}>
				Вы прервали попытку. Результат будет засчитан, как
				отрицательный.
			</div>
		</div>
	);
};
