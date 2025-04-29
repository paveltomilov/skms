'use client';

import React, { ReactNode } from 'react';
import { DndContext, DragStartEvent } from '@dnd-kit/core';
import { useAppDispatch } from '@/shared/hooks/store';
import { setActiveProb } from '@/store/multimeterSlice';
import { restrictToSchemeContainer } from '@/shared/lib/restrictToSchemeContainer';
import { probeTipCollisionDetection } from '@/shared/lib/probeTipCollisionDetection';

interface Props {
	children: ReactNode;
}

export const Simulator: React.FC<Props> = ({ children }) => {
	const dispatch = useAppDispatch();
	/* const environmentRef = useRef<HTMLDivElement>(null);
	const { sensors, collisionDetection, modifiers } = useDndConfig();

	const [activeDragId, setActiveDragId] = useState<UniqueIdentifier | null>(
		null,
	);

	const [currentActiveData, setCurrentActiveData] =
		useState<ActiveDragData>(null);

	const { getProbeStyle, updateProbeVisualPosition } =
		useProbeVisuals(activeDragId);

	const { handleProbeDragEnd } = useProbeDragHandler({
		environmentRef,
		onVisualPositionUpdate: updateProbeVisualPosition,
	});
 */
	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		dispatch(setActiveProb(active.id));

		/* if (isProbeDragData(active.data.current)) {
			setCurrentActiveData(active.data.current);
		} else {
			setCurrentActiveData(null);
		} */
	};

	const handleDragEnd = (/* event: DragEndEvent */) => {
		dispatch(setActiveProb(null));

		/* const { active, over } = event;

		if (isProbeDragData(active.data.current)) {
			handleProbeDragEnd(active as Active, over as Over | null);
		}

		setActiveDragId(null);
		setCurrentActiveData(null); */
	};
	return (
		<DndContext
			/* sensors={sensors}*/
			collisionDetection={probeTipCollisionDetection}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			/* добавить  onMouseLeave */
			modifiers={[restrictToSchemeContainer]}
		>
			{children}
			{/* <div ref={environmentRef} className={styles.environmentWrapper}>
                <div className={styles.measurements}>
                    <PopUp />
                    <Multimeter />
                </div>
                <div className={styles.schemePlacement}>
                    <Scheme />
                </div>
                <Probe id='probe-red' color='red' style={getProbeStyle('red')} />
                <Probe id='probe-black' color='black' style={getProbeStyle('black')} />
            </div>*/}
		</DndContext>
	);
};

export default Simulator;
