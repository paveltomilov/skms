'use client';

import FooterPtk from '@/widgets/FooterPtk';
import Sidebar from '@/widgets/Sidebar';
import styles from '@/_pages/zra/styles.module.scss';
import HeaderTraining from '@/widgets/HeaderTraining';
import AuthGuard from '@/shared/components/AuthGuard';

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthGuard>
			<HeaderTraining />
			<main className={styles.main}>
				<Sidebar />
				{children}
			</main>
			<FooterPtk />
		</AuthGuard>
	);
};