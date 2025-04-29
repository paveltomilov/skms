'use client';

import styles from './styles.module.scss';
import { FC, useEffect, useRef } from 'react';
import { SCHEME_ELEMENTS, SCHEME_POINTS } from '@/shared/configs/scheme';
import { SchemeElement } from '@/entities/SchemeElement';
import { SchemePoint } from '@/entities/SchemePoint';
import { useAppDispatch } from '@/shared/hooks/store';
import { setSchemeSize } from '@/store/multimeterSlice';

const Scheme: FC = () => {
	const dispatch = useAppDispatch();
	const schemeRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (schemeRef.current) {
			const { width, height, left, top } =
				schemeRef.current.getBoundingClientRect();
			dispatch(
				setSchemeSize({
					width,
					height,
					left,
					top,
				}),
			);
		}
	}, [dispatch]);

	return (
		<div ref={schemeRef} className={styles.scheme}>
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
