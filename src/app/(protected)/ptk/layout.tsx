'use client';

import FooterPtk from '@/widgets/FooterPtk';
import HeaderPtk from '@/widgets/HeaderPtk';
import Sidebar from '@/widgets/Sidebar';
import styles from '@/_pages/zra/styles.module.scss';

export default function PtkLayout({ children }: { children: React.ReactNode }) {
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
