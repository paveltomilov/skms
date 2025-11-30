import { FC, useCallback, useState } from 'react';
import styles from './styles.module.scss';

import Button from '@/shared/UI/Button';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { closeAllModal } from '@/store/modalSlice';

export const PopupAbortSimulation: FC = () => {
	const [isAbort, setIsAbort] = useState<boolean>(false);
	const router = useRouter();
	const dispatch = useDispatch();

	const handleChoose = useCallback(() => {
		setIsAbort(true);
		setTimeout(() => {
			dispatch(closeAllModal());
			router.push('/ptk');
		}, 2000);
	}, []);

	const handleCancellation = () => {
		dispatch(closeAllModal());
	};

	return (
		<div className={styles.popup}>
			{!isAbort ? (
				<>
					<span className={styles.popup__text}>
						Вы уверены, что хотите прервать попытку?
					</span>
					<div className={styles.popup__buttons}>
						<Button
							className={styles.button}
							width={276}
							height={55}
							text="Да, прервать"
							onClick={handleChoose}
						/>
						<Button
							className={styles.button}
							width={276}
							height={55}
							text="Отмена"
							onClick={handleCancellation}
						/>
					</div>
				</>
			) : (
				<div className={styles.popup__text}>
					Вы прервали попытку. Результат будет засчитан, как
					отрицательный.
				</div>
			)}
		</div>
	);
};
