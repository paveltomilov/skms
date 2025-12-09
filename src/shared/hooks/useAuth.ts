'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
	checkAuth,
	getAccessToken,
	initAccessFromStorage,
} from '@/shared/api';
import { getCookie } from 'cookies-next';
import { isPublicRoute, UserRole } from '@/shared/configs/routes';
import { useAppDispatch } from '@/shared/hooks/store';
import { clearUserInfo, setUserInfo } from '@/store/userInfoSlice';

export const useAuth = () => {
	const pathname = usePathname();
	const dispatch = useAppDispatch();
	const [state, setState] = useState<{
		role: UserRole | null;
		loading: boolean;
		error: string | null;
	}>({
		role: null,
		loading: true,
		error: null,
	});
	const currentAccessToken = getAccessToken();

	useEffect(() => {
		initAccessFromStorage();
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
						dispatch(clearUserInfo());
					} else if (isMounted) {
						setState({
							role: null,
							loading: false,
							error: null,
						});
						dispatch(clearUserInfo());
					}
					return;
				}

				const cookieRole = getCookie('role');
				const firstName = getCookie('first_name');
				const lastName = getCookie('last_name');

				if (!cookieRole) {
					if (isMounted) {
						setState({
							role: null,
							loading: false,
							error: 'Роль не определена',
						});
						dispatch(clearUserInfo());
					}
					return;
				}

				if (isMounted) {
					const userRole = cookieRole as UserRole;
					setState({
						role: userRole,
						loading: false,
						error: null,
					});

					dispatch(
						setUserInfo({
							first_name:
								typeof firstName === 'string'
									? firstName
									: null,
							last_name:
								typeof lastName === 'string' ? lastName : null,
							role: userRole,
							accessToken:
								typeof currentAccessToken === 'string'
									? currentAccessToken
									: null,
						}),
					);
				}
			} catch (error) {
				console.error('Auth error:', error);

				if (isMounted) {
					setState({
						role: null,
						loading: false,
						error: 'Ошибка аутентификации',
					});

					dispatch(clearUserInfo());
				}
			}
		};

		checkAuthAndFetchUser();

		return () => {
			isMounted = false;
		};
	}, [pathname, dispatch, currentAccessToken]);

	return {
		...state,
		accessToken: currentAccessToken,
	};
};
