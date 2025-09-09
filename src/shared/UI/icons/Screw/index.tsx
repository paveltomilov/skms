import { ICON_SIZE } from '@/shared/configs/icon';
import { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import cn from 'classnames';

interface Props {
	className?: string;
	isOpen?: boolean;
}

const Screw: FC<Props> = ({ className, isOpen = false }) => {
	const sizes = ICON_SIZE['sm'];
	const [status, setStatus] = useState<boolean>(isOpen);

	useEffect(() => {
		setStatus(isOpen);
	}, [isOpen]);

	function handelCrew() {
		setStatus(prev => !prev);
	}

	return (
		<svg
			onClick={handelCrew}
			width={sizes.width}
			height={sizes.height}
			preserveAspectRatio="xMidYMid meet"
			className={cn(styles.icon, className, {
				[styles.icon_open]: status,
				[styles.icon]: !status,
			})}
		>
			<use
				xlinkHref={'/svg/sprite.svg#screw'}
				width="100%"
				height="100%"
			/>
		</svg>
	);
};

export default Screw;
