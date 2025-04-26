import styles from './styles.module.scss';
import { FC } from 'react';
import { SCHEME_ELEMENTS, SCHEME_POINTS } from '@/shared/configs/scheme';
import { SchemeElement } from '@/entities/SchemeElement';
import { SchemePoint } from '@/entities/Point';

const Scheme: FC = () => {
	return (
		<div className={styles.scheme}>
			{SCHEME_ELEMENTS.map(item => (
				<SchemeElement key={item.id} element={item} />
			))}

			{SCHEME_POINTS.map(item => (
				<SchemePoint key={item.id} id={item.id} />
			))}
		</div>
	);
};

export default Scheme;