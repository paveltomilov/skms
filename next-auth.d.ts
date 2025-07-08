import NextAuth from 'next-auth';

// расширяем библиотечный интерфейс User
declare module 'next-auth' {
	interface Session {
		user: {
			access: string | null;
			refresh: string | null;
		};
	}
}
