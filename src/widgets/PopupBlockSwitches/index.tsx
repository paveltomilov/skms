import { cloneElement, FC, ReactElement, ReactNode } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Provod from '@/shared/UI/Provod';
import Channel from '@/shared/UI/icons/Channel';
import Screw from '@/shared/UI/icons/Screw';
import Marker from '@/shared/UI/Marker';
import ProvodConstructor from '@/shared/UI/ProvodConstructor';

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
				<div className={styles.textBlock}>
					<span className={styles.textBlock__text}>A11</span>
					<span className={styles.textBlock__text}>A1</span>
					<span className={styles.textBlock__text}>A19</span>
				</div>
				<div className={styles.block__left}>
					{reRenderingElement(<Channel size="md" />, 8)}
					<div className={styles.block__left_provod}>
						<Provod length={317} rotate={90} />
						<Provod length={317} rotate={90} />
					</div>
					<div className={styles.block__left_marker}>
						<Marker text="A11" />
						<Marker text="A19" />
					</div>
					<div className={styles.provod__A1}>
						<ProvodConstructor
							isBreak_end
							provod_B={178}
							turn_A="180"
						/>
						<ProvodConstructor
							provod_B={86}
							turn_A="180"
							turn_B="90"
						/>
						<Marker
							text="A1"
							className={styles.provod__A1_marker}
						/>
					</div>
					<div className={styles.block__left_screw}>
						<Screw />
						<Screw />
						<Screw />
						<Screw />
					</div>
				</div>
				<div className={styles.block__right}>
					{reRenderingElement(<Channel />, 4)}
				</div>
			</div>
		</div>
	);
};

export default PopupBlockSwitches;
