import { cloneElement, FC, ReactElement, ReactNode } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';
import Provod from '@/shared/UI/Provod';
import Channel from '@/shared/UI/icons/Channel';
import Screw from '@/shared/UI/icons/Screw';

interface Props {
	className?: string;
}

function reRenderingElement(
	element: ReactElement,
	quantity: number,
): ReactNode[] {
	const elements: ReactNode[] = [];
	for (let i = 0; i < quantity; i++) {
		// Клонируем элемент с уникальным key
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
						<Provod length={317} rotate={90} />
						<Provod length={317} rotate={90} />
					</div>
					<div className={styles.block__left_screw}>
						<Screw />
						<Screw />
					</div>
				</div>
				<div className={styles.block__right}>
					{reRenderingElement(<Channel />, 4)}
				</div>
			</div>
			<div className={styles.textBlock}>
				<span className={styles.textBlock__text}>A11</span>
				<span className={styles.textBlock__text}>A1</span>
				<span className={styles.textBlock__text}>A19</span>
			</div>
		</div>
	);
};

export default PopupBlockSwitches;
