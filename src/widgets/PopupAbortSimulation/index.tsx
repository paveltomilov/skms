import { FC, useEffect } from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { closeAllModal } from '@/store/modalSlice';
import { useAppDispatch } from '@/shared/hooks/store';

export const PopupAbortSimulation: FC = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(closeAllModal());
			router.push('/ptk');
		}, 2000);

		return () => clearTimeout(timer);
	}, [dispatch, router]);

	return (
		<div className={styles.popup}>
			<div className={styles.popup__text}>
				Вы прервали попытку. Результат будет засчитан, как
				отрицательный.
			</div>
		</div>
	);
};
