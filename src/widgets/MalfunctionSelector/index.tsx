import { CircuitElement, Malfunction } from '@/shared/types/scheme';
import { SimulationItemData } from '@/shared/types/simulation';
import {
	Dispatch,
	FC,
	SetStateAction,
	useCallback,
	useRef,
	useState,
} from 'react';
import DropListMalfunction from '../DropListMalfunction';
import DropListElements from '../DropListElements';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { useClickEscape } from '@/shared/hooks/useClickEscape';
import { useUserCookies } from '@/shared/hooks/useUserCookies';

interface Props {
	setMalfun: (simulation: SimulationItemData) => void;
	selectMalfun: (malfunction: string) => void;
	data: CircuitElement[];
	closeList: Dispatch<SetStateAction<boolean>>;
}

const MalfunctionSelector: FC<Props> = ({ 
	setMalfun, 
	selectMalfun, 
	data, 
	closeList,
 }) => {
	const [choiceElement, setChoiceElement] = useState<CircuitElement | null>(
		null,
	);
	const [choiceMalfunction, setChoiceMalfunction] = useState<
		Malfunction[] | null
	>(null);
	const dropListMalfunctionRef = useRef<HTMLDivElement>(null);
	const dropListElementsRef = useRef<HTMLDivElement>(null);

	const {role} = useUserCookies();

	// Закрываем список при клике вне его
	useClickOutside(
		[dropListElementsRef, dropListMalfunctionRef], 
		() => closeList(false),
	);

	useClickEscape(dropListElementsRef, dropListMalfunctionRef, () => {
		if (choiceElement) {
			setChoiceElement(null);
		} else {
			closeList(false);
		}
	});

	const handleChoiceElement = useCallback(
		(item: CircuitElement) => {
			setChoiceElement(item);
			const malfunctionsElement =
				data.find(element => element.id === item.id)?.malfunctions ??
				null;
			setChoiceMalfunction(malfunctionsElement);
		},
		[data],
	);

	const handleChoice = useCallback(
		(malfunction: Malfunction) => {
			// Проверяем, что элемент схемы выбран
			if (choiceElement) {
				// Для студента — только сохраняем id неисправности для последующего определения
				if (role === 'student') {
					selectMalfun(malfunction.id);
					setChoiceElement(null);
					return;
				}
				// Для учителя — добавляем полный объект в список для назначения симуляции
				setMalfun({
					malfunction_id: malfunction.id,
					malfunctions: malfunction.name,
					element_id: choiceElement.id,
					element: choiceElement.name,
				});
				setChoiceElement(null);
			}
		},
		[choiceElement, setMalfun],
	);

	return (
		<>
			<DropListElements
				forwardRef={dropListElementsRef}
				data={data}
				handleChoiceElement={handleChoiceElement}
				choiceElement={choiceElement}
			/>
			{choiceElement && (
				<DropListMalfunction
					forwardRef={dropListMalfunctionRef}
					malfunctions={choiceMalfunction}
					handleChoice={handleChoice}
				/>
			)}
		</>
	);
};

export default MalfunctionSelector;
