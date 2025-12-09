import { Malfunction } from '@/shared/types/scheme';
import { FC, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { useRequestData } from '@/shared/hooks/useRequestData';
import { postSimulation } from '@/shared/api';
import { closeModal } from '@/store/modalSlice';
import { useRouter } from 'next/navigation';
import { clearCurrentStudent } from '@/store/trainingSlice';
import { SimulationFormData } from '@/shared/types/simulation';
import { startSimulation } from '@/store/simulationSlice';
import { setActiveGate } from '@/store/gateSlice';
import { activateMalfunction } from '@/store/circuitSlice';
import { SIMULATION_MALFUNCTIONS } from '@/shared/configs/simulationMalfunctions';

const FormMalfunction: FC = () => {
	const [elementValue, setElementValue] = useState('');
	const [malfunctionValue, setMalfunctionValue] = useState('');

	const isButtonDisabled = !elementValue || !malfunctionValue;

	const [malfunctions, setMalfunctions] = useState<Malfunction[]>([]);

	const studentId = useAppSelector(
		(state): number | null => state.training.studentId,
	);

	const dispatch = useAppDispatch();
	const router = useRouter();

	const { urlBase, access, elements } = useRequestData();

	const handleSetSimulation = async (malfunctionsArray: string) => {
		if (studentId) {
			const formData: SimulationFormData = {
				user: studentId,
				malfunctions: [{ malfunction_id: malfunctionsArray }],
			};

			try {
				// Отправляем данные на сервер
				await postSimulation(urlBase, access, formData);

				// Генерируем уникальный ID симуляции
				const simulationId = `sim-${Date.now()}`;

				// Инициализируем симуляцию с неисправностями из константы
				dispatch(
					startSimulation({
						simulationId,
						originalMalfunctions:
							SIMULATION_MALFUNCTIONS.malfunctions,
					}),
				);

				// Устанавливаем активную задвижку из константы
				dispatch(setActiveGate(SIMULATION_MALFUNCTIONS.gateId));

				// Активируем неисправности в схеме
				SIMULATION_MALFUNCTIONS.malfunctions.forEach(malfunction => {
					dispatch(activateMalfunction(malfunction.id));
				});

				dispatch(clearCurrentStudent());
				dispatch(closeModal('setSimulation'));
				router.push('/ptk');
			} catch (error) {
				console.error('Ошибка при создании симуляции:', error);
			}
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleSetSimulation(malfunctionValue);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.element}>
				<select
					id="element-select"
					value={elementValue}
					onChange={e => {
						setElementValue(e.target.value);
						const current = elements.filter(
							el => el.id === e.target.value,
						);
						if (current.length > 0 && current[0]) {
							setMalfunctions(current[0].malfunctions);
						}
					}}
					className={styles.element__select}
				>
					<option value="">Выберите элемент</option>
					{elements.map(({ id, name }) => (
						<option key={id} value={id} className={styles.opt}>
							{name}
						</option>
					))}
				</select>
			</div>
			<div className={styles.malfunction}>
				<select
					id="malfunction-select"
					value={malfunctionValue}
					className={styles.malfunction__select}
					onChange={e => setMalfunctionValue(e.target.value)}
				>
					<option value="">Выберите неисправность</option>
					{malfunctions.map(malfunction => (
						<option
							key={malfunction.id}
							value={malfunction.id}
							className="opt"
						>
							{malfunction.name}
						</option>
					))}
				</select>
			</div>
			<Button disabled width={307} height={38} text="Удалить симуляцию" />
			<Button
				width={307}
				height={38}
				text="Назначить симуляцию"
				disabled={isButtonDisabled}
				onClick={() => handleSetSimulation(malfunctionValue)}
			/>
		</form>
	);
};

export default FormMalfunction;
