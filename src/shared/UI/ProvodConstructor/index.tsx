import { FC } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import BreakLine from '../icons/BreakLine';
import Bend from '../icons/Bend';
import ProvodLine from '../icons/ProvodLine';

interface Props {
	className?: string;
	provod_A?: number;
	turn_A?: '90' | '180' | '270' | '0' | false;
	provod_B?: number;
	turn_B?: '90' | '180' | '270' | '0' | false;
	provod_C?: number;
	isBreak?: boolean;
	isBreak_end?: boolean;
	rotate?: '90' | '180' | '270' | '0';
}

const ProvodConstructor: FC<Props> = ({
	className,
	isBreak = false,
	isBreak_end = false,
	provod_A = 0,
	provod_B = 0,
	provod_C = 0,
	turn_A,
	turn_B,
	rotate = 0,
}) => {
	return (
		<div
			style={{ transform: `rotate(${rotate}deg)` }}
			className={cn(className, styles.provod)}
		>
			{' '}
			{isBreak_end && <BreakLine isBreak_end />}
			{provod_C <= 0 ? null : (
				<ProvodLine length={provod_C} isDefault isPin={false} />
			)}
			{turn_B && <Bend rotate={turn_B} />}
			{provod_B <= 0 ? null : (
				<ProvodLine length={provod_B} isDefault isPin={false} />
			)}
			{turn_A && <Bend rotate={turn_A} />}
			{provod_A <= 0 ? null : (
				<ProvodLine length={provod_A} isDefault isPin={false} />
			)}
			{isBreak && <BreakLine />}
		</div>
	);
};

export default ProvodConstructor;
