import { CircuitElement, Malfunction } from '@/shared/types/scheme';
import { SimulationItemData } from '@/shared/types/simulation';
import { FC, useRef, useState } from 'react';
import DropListMalfunction from '../DropListMalfunction/DropListMalfunction';
import DropListElements from '../DropListElements/DropListElements';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

interface Props {
	setMalfun: (simulation: SimulationItemData) => void;
	data: CircuitElement[];
}

const ListChoiceMalfunction: FC<Props> = ({ setMalfun, data }) => {
	const [choiceElement, setChoiceElement] = useState<CircuitElement | null>(
		null,
	);

	const dropdownRef = useRef<HTMLDivElement>(null);

	// Закрываем список ошибок при клике вне его
	useClickOutside(dropdownRef, () => setChoiceElement(null));

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
				data={data}
				handleChoiceElement={handleChoiceElement}
				choiceElement={choiceElement}
			/>
			{choiceElement && (
				<DropListMalfunction
					ref={dropdownRef}
					data={data}
					choiceElement={choiceElement}
					handleChoice={handleChoice}
				/>
			)}
		</>
	);
};

export default ListChoiceMalfunction;
