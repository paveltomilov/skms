'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from '@/shared/lib/auth';
import ModalWrapper from '@/widgets/ModalWrapper';
import AuthGuard from '@/shared/components/AuthGuard';

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [checking, setChecking] = useState(true);

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
		<AuthGuard>
			<ModalWrapper />
			{children}
		</AuthGuard>
	);
}
