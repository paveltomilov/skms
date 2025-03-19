import Footer from '@c/Footer';
import Sidebar from '@c/Sidebar';
import { Suspense } from 'react';
import styles from './page.module.scss';
import Header from '@c/Header/Header';
import ParentComponent from '@c/PopUp/ParentComponent'; 
import Multimetr from '@/components/Multimetr';

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
				<ParentComponent />
				<Multimetr />
			</main>
			<Footer />
		</Suspense>
	);
}


