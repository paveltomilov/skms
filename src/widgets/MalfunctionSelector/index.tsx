import { CircuitElement, CircuitElementSelect, Malfunction } from '@/shared/types/scheme';
import { SimulationItemData } from '@/shared/types/simulation';
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import DropListMalfunction from '../DropListMalfunction';
import DropListElements from '../DropListElements/DropListElements';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

interface Props {
	setMalfun: (simulation: SimulationItemData) => void;
	data: CircuitElementSelect[];
	closeList: Dispatch<SetStateAction<boolean>>;
}

const MalfunctionSelector: FC<Props> = ({ setMalfun, data, closeList }) => {
	const [choiceElement, setChoiceElement] = useState<CircuitElement | null>(
		null,
	);
	const [choiceMalfunction, setChoiceMalfunction] = useState<
		Malfunction[] | null
	>(null);
	const dropListMalfunctionRef = useRef<HTMLDivElement>(null);
	const dropListElementsRef = useRef<HTMLDivElement>(null);

	// Закрываем список при клике вне его
	useClickOutside(dropListElementsRef, dropListMalfunctionRef, () =>
		closeList(false),
	);

	function handleChoiceElement(item: CircuitElement) {
		setChoiceElement(item);
		const malfunctionsElement =
			data.filter(element => element.id === item.id)[0].malfunctions ??
			null;
		setChoiceMalfunction(malfunctionsElement);
	}

	function handleChoice(malfunction: Malfunction) {
		if (choiceElement)
			setMalfun({
				malfunction_id: malfunction.id,
				element: choiceElement.name,
				malfunctions: malfunction.name,
				element_id: choiceElement.id,
			});
		setChoiceElement(null);
	}

	return (
		<>
			<DropListElements
				ref={dropListElementsRef}
				data={data}
				handleChoiceElement={handleChoiceElement}
				choiceElement={choiceElement}
			/>
			{choiceElement && (
				<DropListMalfunction
					ref={dropListMalfunctionRef}
					malfunctions={choiceMalfunction}
					handleChoice={handleChoice}
				/>
			)}
		</>
	);
};

export default MalfunctionSelector;
