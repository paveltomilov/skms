import { FC, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { closeAllModal } from '@/store/modalSlice';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';

export const PopupAbortSimulation: FC = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const abortSimulation = useAppSelector(
		state => state.modal.abortSimulation,
	);
	const hasRedirectedRef = useRef(false);

	const redirectToStats = () => {
		if (!hasRedirectedRef.current) {
			hasRedirectedRef.current = true;
			dispatch(closeAllModal());
			router.push('/simulation/stats');
		}
	};

	// Редирект по таймеру (через 2 секунды)
	useEffect(() => {
		const timer = setTimeout(() => {
			redirectToStats();
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	// Редирект при закрытии модалки (когда abortSimulation становится false)
	useEffect(() => {
		if (!abortSimulation && !hasRedirectedRef.current) {
			redirectToStats();
		}
	}, [abortSimulation]);

	return (
		<div className={styles.popup}>
			<div className={styles.popup__text}>
				Вы прервали попытку. Результат будет засчитан, как
				отрицательный.
			</div>
		</div>
	);
};
