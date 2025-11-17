import { CircuitElement, Malfunction } from '@/shared/types/scheme';
import { SimulationItemData } from '@/shared/types/simulation';
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react';
import DropListMalfunction from '../DropListMalfunction/DropListMalfunction';
import DropListElements from '../DropListElements/DropListElements';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

interface Props {
	setMalfun: (simulation: SimulationItemData) => void;
	data: CircuitElement[];
	closeList: Dispatch<SetStateAction<boolean>>;
}

const ListChoiceMalfunction: FC<Props> = ({ setMalfun, data, closeList }) => {
	const [choiceElement, setChoiceElement] = useState<CircuitElement | null>(null);
	const dropListMalfunctionRef = useRef<HTMLDivElement>(null);
	const dropListElementsRef = useRef<HTMLDivElement>(null);

	// Закрываем список при клике вне его
	useClickOutside(dropListElementsRef, dropListMalfunctionRef, () =>
		closeList(false),
	);

	function handleChoiceElement(item: CircuitElement) {
		setChoiceElement(item);
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
					data={data}
					choiceElement={choiceElement}
					handleChoice={handleChoice}
				/>
			)}
		</>
	);
};

export default ListChoiceMalfunction;
