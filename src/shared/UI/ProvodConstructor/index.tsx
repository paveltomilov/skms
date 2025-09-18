import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import BreakLine from '../icons/BreakLine';
import Bend from '../icons/Bend';
import ProvodLine from '../icons/ProvodLine';

interface Props {
	className?: string;
	provod_A?: number;
	turn_A?: '90' | '180' | '270' | '0';
	provod_B?: number;
	turn_B?: '90' | '180' | '270' | '0';
	provod_C?: number;
	isBreak?: boolean;
	isBreak_end?: boolean;
	rotate?: '90' | '180' | '270' | '0';
}

const ProvodConstructor: FC<Props> = ({
	className,
	isBreak = false,
	isBreak_end = false,
	provod_A,
	provod_B,
	provod_C,
	turn_A,
	turn_B,
	rotate = 0,
}) => {
	return (
		<div
			style={{ transform: `rotate(${rotate}deg)` }}
			className={cn(className, styles.provod)}
		>	{isBreak_end && <BreakLine isBreak_end />}
			{provod_C && <ProvodLine length={provod_C} />}
			{turn_B && <Bend rotate={turn_B} />}
			{provod_B && <ProvodLine length={provod_B} />}
			{turn_A && <Bend rotate={turn_A} />}
			{provod_A && <ProvodLine length={provod_A} />}
			{isBreak && <BreakLine />}
		</div>
	);
};

export default ProvodConstructor;
