import NextAuth, { User, type AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'Username',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},

			async authorize(credentials) {
				if (!credentials?.username || !credentials.password)
					return null;

				const res = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							username: credentials?.username,
							password: credentials?.password,
						}),
					},
				);
				const user = (await res.json()) as User;
				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }) {
			// eslint-disable-next-line
			session.user = token as any;
			return session;
		},
	},
};

// из-за того что NextAuth - возвращает any, выключаю линтер на следующей строке
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
