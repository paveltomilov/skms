import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.scss';
import StoreProvider from './StoreProvider';

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
				<StoreProvider>{children}</StoreProvider>
			</body>
		</html>
	);
}
