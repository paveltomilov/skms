'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from '@/shared/lib/auth';
import ModalWrapper from '@/widgets/ModalWrapper';
import useRandomWindowCurrentValue from '@/shared/hooks/useRandomWindowCurrentValue';
import { getRandomNumberWindows } from '@/shared/utils/getRandomNumberWindows/getRandomNumberWindows';

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [checking, setChecking] = useState(true);

	const updateWindows = useRandomWindowCurrentValue();
	useEffect(() => {
		const interval = setInterval(() => {
			updateWindows();
		}, getRandomNumberWindows(1000, 2000));
		return () => clearInterval(interval);
	}, [updateWindows]);

	useEffect(() => {
		async function verify() {
			const { valid } = await checkAuth();
			if (!valid) {
				router.push('/login');
			} else {
				setChecking(false);
			}
		}
		verify();
	}, [router]);

	if (checking) return <p>Проверка авторизации...</p>;

	return (
		<>
			<ModalWrapper />
			{children}
		</>
	);
}
