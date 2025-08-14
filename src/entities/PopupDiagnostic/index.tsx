import { useAppDispatch } from '@/shared/hooks/store';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { FC } from 'react';
import { openModal } from '@/store/modalSlice';

const PopupDiagnostic: FC = () => {
	const dispatch = useAppDispatch();
	// Для теста
	const mass = [
		{
			title: 'Выполнена команда закрыть',
			diagnosticState: null,
		},
		{
			title: 'Выполнена команда стоп',
			diagnosticState: null,
		},
		{
			title: 'Выполнена команда сброс ошибок',
			diagnosticState: true,
		},
		{
			title: 'Управление запрещено оператором',
			diagnosticState: false,
		},
	];

	return (
		<div className={styles.popupDiagnostic}>
			<ul className={styles.popupDiagnostic_center}>
				{mass.map((item, index) => (
					<li
						key={index}
						className={styles.popupDiagnostic_center_item}
					>
						<div
							className={
								styles.popupDiagnostic_center_item__square
							}
							data-state={item.diagnosticState}
						></div>
						{item.title}
					</li>
				))}
			</ul>
			<div className={styles.popupDiagnostic_bottom}>
				<span className={styles.popupDiagnostic_bottom__name}>
					Какой-то Name
				</span>
				<Button
					width={206}
					height={38}
					aria-label="Сброс диагностики"
					text="Сброс диагностики"
					className={styles.popupDiagnostic_bottom_btn}
				/>
				<Button
					width={69}
					height={38}
					aria-label="Ф.Ск"
					text="Ф.Ск"
					className={styles.popupDiagnostic_bottom_btn}
					onClick={() => dispatch(openModal('gateValves'))}
				/>
				<Button
					width={97}
					height={38}
					aria-label="Журнал"
					text="Журнал"
					disabled
					className={styles.popupDiagnostic_bottom_btn}
				/>
				<Button
					width={243}
					height={38}
					aria-label="Разрешить управление"
					text="Разрешить управление"
					disabled
					className={styles.popupDiagnostic_bottom_btn}
				/>
			</div>
		</div>
	);
};

export default PopupDiagnostic;
