import { FC, useCallback, useState } from 'react';
import styles from './styles.module.scss';

import Button from '@/shared/UI/Button';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { closeAllModal } from '@/store/modalSlice';
import { useAppSelector } from '@/shared/hooks/store';
import { deactivateMalfunction } from '@/store/circuitSlice';
import { resetSimulation } from '@/store/simulationSlice';

export const PopupAbortSimulation: FC = () => {
	const [isAbort, setIsAbort] = useState<boolean>(false);
	const router = useRouter();
	const dispatch = useDispatch();
	const simulation = useAppSelector(state => state.simulation);

	const handleCancellation = () => {
		dispatch(closeAllModal());
	};

	const handleStopSimulation = useCallback(() => {
		// Деактивируем все неисправности из симуляции
		if (simulation.originalMalfunctions.length > 0) {
			simulation.originalMalfunctions.forEach(malfunction => {
				dispatch(deactivateMalfunction(malfunction.id));
			});
		}

		// Сбрасываем состояние симуляции до дефолтного
		dispatch(resetSimulation());

		setIsAbort(true);
		const timer = setTimeout(() => {
			dispatch(closeAllModal());
			router.push('/ptk');
		}, 2000);
		return () => clearTimeout(timer);

	}, [simulation, dispatch, router]);

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
							onClick={handleStopSimulation}
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
