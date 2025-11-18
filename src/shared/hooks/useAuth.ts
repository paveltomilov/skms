'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from '@/shared/lib/auth';
import { getCookie } from 'cookies-next';
import { isPublicRoute, UserRole } from '@/shared/configs/routes';

export const useAuth = (requiredRole?: UserRole) => {
	const pathname = usePathname();
	const [state, setState] = useState<{
		role: UserRole | null;
		loading: boolean;
		error: string | null;
	}>({
		role: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		let isMounted = true;

		const checkAuthAndFetchUser = async () => {
			if (!isMounted) return;

			try {
				setState(prev => ({ ...prev, loading: true }));

				const { valid } = await checkAuth();

				if (!valid) {
					if (!isPublicRoute(pathname) && isMounted) {
						setState({
							role: null,
							loading: false,
							error: 'Требуется авторизация',
						});
					} else if (isMounted) {
						setState({
							role: null,
							loading: false,
							error: null,
						});
					}
					return;
				}

				const cookieRole = getCookie('role');
				if (!cookieRole) {
					if (isMounted) {
						setState({
							role: null,
							loading: false,
							error: 'Роль не определена',
						});
					}
					return;
				}

				if (isMounted) {
					setState({
						role: cookieRole as UserRole,
						loading: false,
						error: null,
					});
				}
			} catch {
				if (isMounted) {
					setState({
						role: null,
						loading: false,
						error: 'Ошибка аутентификации',
					});
				}
			}
		};

		checkAuthAndFetchUser();

		return () => {
			isMounted = false;
		};
	}, [pathname, requiredRole]);

	return state;
};
