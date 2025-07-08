'use client';

import { SessionProvider } from 'next-auth/react';
import { FC, ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
	return <SessionProvider>{children}</SessionProvider>;
};
