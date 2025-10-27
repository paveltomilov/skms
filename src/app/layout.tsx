import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import StoreProvider from './StoreProvider';
import { Suspense } from 'react';
import Loading from './loading';
import './globals.scss';

const roboto = Roboto({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Skill Management System',
	description: 'Мы создали систему управления навыками',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" className={`${roboto.className}`}>
			<body>
				<StoreProvider>
					<Suspense fallback={<Loading />}>{children}</Suspense>
				</StoreProvider>
			</body>
		</html>
	);
}
