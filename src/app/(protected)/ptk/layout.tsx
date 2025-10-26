'use client';

import FooterPtk from '@/widgets/FooterPtk';
import HeaderPtk from '@/widgets/HeaderPtk';
import Sidebar from '@/widgets/Sidebar';
import styles from '@/_pages/zra/styles.module.scss';
import { useEffect } from 'react';
import useRandomWindowCurrentValue from '@/shared/hooks/useRandomWindowCurrentValue';
import { getRandomNumberWindows } from '@/shared/utils/getRandomNumberWindows/getRandomNumberWindows';

export default function PtkLayout({ children }: { children: React.ReactNode }) {
	const updateWindows = useRandomWindowCurrentValue();
	useEffect(() => {
		const interval = setInterval(() => {
			updateWindows();
		}, getRandomNumberWindows(1000, 2000));

		return () => clearInterval(interval);
	}, [updateWindows]);

	return (
		<>
			<HeaderPtk />
			<main className={styles.main}>
				<Sidebar />
				{children}
			</main>
			<FooterPtk />
		</>
	);
}
