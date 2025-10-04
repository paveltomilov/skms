import { cloneElement, FC, ReactElement, ReactNode } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Provod from '@/shared/UI/Provod';
import Channel from '@/shared/UI/icons/Channel';
import ProvodConstructor from '@/shared/UI/ProvodConstructor';
import ScrewConnection from '@/shared/UI/ScrewConnection';
import Bend from '@/shared/UI/icons/Bend';

interface Props {
	className?: string;
}

function reRenderingElement(
	element: ReactElement,
	quantity: number,
): ReactNode[] {
	const elements: ReactNode[] = [];
	for (let i = 0; i < quantity; i++) {
		elements.push(cloneElement(element, { key: i }));
	}
	return elements;
}

const PopupBlockSwitches: FC<Props> = ({ className }) => {
	return (
		<div className={cn(className, styles.popupWindow)}>
			<div className={styles.block}>
				<div className={styles.block__left}>
					{reRenderingElement(<Channel size="md" />, 8)}
					<div className={styles.block__left_provod}>
						<Provod length={300} rotate={90} marker="A11" />
						<Provod length={300} rotate={90} marker="A19" />
					</div>
					<div className={styles.block__left_screw}>
						<ScrewConnection id="c.3.1.2" provodLocation="left" textTop="A11" />
						<ScrewConnection id="c.3.1.1" provodLocation="right" textTop="A1" />
						<ScrewConnection id="c.3.2.2" provodLocation="left" textTop="A19" />
						<ScrewConnection id="c.3.2.1" provodLocation="right" />
					</div>
				</div>
				<div className={styles.provodA1}>
					<Provod length={191} rotate={180} marker="A1" />
					<Bend className={styles.provodA1__bend} rotate="180" />
					<ProvodConstructor provod_B={86} turn_A="180" turn_B="90" />
				</div>
				<div className={styles.block__right}>
					{reRenderingElement(<Channel />, 4)}
				</div>
			</div>
		</div>
	);
};

export default PopupBlockSwitches;
