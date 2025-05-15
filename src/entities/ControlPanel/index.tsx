import { FC, useRef } from 'react';
import styles from './styles.module.scss';
import { MultimeterMode } from '@/shared/types/multimeter';
import { ARROW_ANGLES } from '@/shared/configs/multimeter';
import { useMultimeterKnob } from '@/shared/hooks/useMultimeterKnob';
import MultimeterArrow from '@/shared/UI/icons/MultimeterArrow';
import Panel from '@/shared/UI/icons/Panel';
import Image from 'next/image';

interface Props {
	mode: MultimeterMode;
}

const ControlPanel: FC<Props> = ({ mode }) => {
	const knobRef = useRef<SVGSVGElement | null>(null);

	// логика вращения колеса внутри кастомного хука
	const { currentAngle, onMouseDown } = useMultimeterKnob<MultimeterMode>(
		knobRef,
		ARROW_ANGLES,
		mode,
	);

	return (
		<Panel className={styles.panel}>
			<MultimeterArrow
				ref={knobRef}
				onMouseDown={onMouseDown}
				className={styles.panel__arrow}
				angle={currentAngle}
			/>
			<Image
				src="/images/multimeter.png"
				width={247}
				height={333}
				className={styles.panel__background}
				alt="multimeter"
			/>
			{/* <ProbeWire
				className={`${styles.panel__wire} ${styles.panel__wire_black}`}
			/>
			<ProbeWire
				color="grey"
				className={`${styles.panel__wire} ${styles.panel__wire_grey}`}
			/>
			<ProbeWire
				color="red"
				className={`${styles.panel__wire} ${styles.panel__wire_red}`}
			/> */}
		</Panel>
	);
};
export default ControlPanel;
