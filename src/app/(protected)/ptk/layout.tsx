'use client';

import FooterPtk from '@/widgets/FooterPtk';
import HeaderPtk from '@/widgets/HeaderPtk';
import Sidebar from '@/widgets/Sidebar';
import styles from '@/pages/zra/styles.module.scss';
import AuthGuard from '@/shared/components/AuthGuard';

export default function PtkLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthGuard>
			<HeaderPtk />
			<main className={styles.main}>
				<Sidebar />
				{children}
			</main>
			<FooterPtk />
		</AuthGuard>
	);
}
