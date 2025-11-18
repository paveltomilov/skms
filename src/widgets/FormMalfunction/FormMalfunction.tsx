import { Malfunction } from '@/shared/types/scheme';
import { FC, useState } from 'react';
import styles from './styles.module.scss';
import Button from '@/shared/UI/Button';
import { SimulationFormData } from '@/shared/types/similation';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/store';
import { useRequestData } from '@/shared/hooks/useRequestData';
import { postSimulation } from '@/shared/utils/postSimulation/postSimulation';
import { closeModal } from '@/store/modalSlice';
import { useRouter } from 'next/navigation';
import { clearStudentId } from '@/store/trainingSlice';

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

	const handleSetSimulation = (malfunctionsArray: string) => {
		if (studentId !== null) {
			const formData: SimulationFormData = {
				user: studentId,
				malfunctions: [{ malfunction_id: malfunctionsArray }],
			};
			dispatch(clearStudentId());
			postSimulation(urlBase, access, formData);
			dispatch(closeModal('setSimulation'));
			router.push('/training');
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
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
