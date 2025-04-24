'use client';

import styles from './styles.module.scss';
import { FC } from 'react';
import { CircuitElements, Points } from '@/shared/configs/schemePart';
import { Point } from '@/entities/Point';
import { CircuitElementBtn } from '@/entities/CircuitElementBtn';

const Scheme: FC = () => {
	return (
		<div className={styles.scheme}>
			{CircuitElements.map(item => (
				<CircuitElementBtn key={item.id} id={item.id} icon={item.icon} title={item.title}/>
			))}

			{Points.map(item => (
				<Point
					key={item.id}
					id={item.id}
				></Point>
			))}
		</div>
	);
};
export default Scheme;
