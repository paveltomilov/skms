'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from '@/shared/api';
import ModalWrapper from '@/widgets/ModalWrapper';
import useRandomWindowCurrentValue from '@/shared/hooks/useRandomWindowCurrentValue';
import AuthGuard from '@/shared/components/AuthGuard';
import Dnd from '@/widgets/Dnd';
import { useWebSocket } from '@/shared/hooks/useWebSocket';

export default function ProtectedLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [checking, setChecking] = useState(true);

	useRandomWindowCurrentValue();

	// Инициализация WebSocket соединения
	useWebSocket();

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
			<Dnd>
				<ModalWrapper />
				{children}
			</Dnd>
		</AuthGuard>
	);
}
