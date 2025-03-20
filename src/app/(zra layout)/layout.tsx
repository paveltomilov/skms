import Footer from '@/widgets/Footer';
import Sidebar from '@/widgets/Sidebar';
import { Suspense } from 'react';
import styles from './page.module.scss';
import Header from '@/widgets/Header/Header';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Suspense>
			<Header />
			<main className={styles.main}>
				<Sidebar />
				{children}
			</main>
			<Footer />
		</Suspense>
	);
}
