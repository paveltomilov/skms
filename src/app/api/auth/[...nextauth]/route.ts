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
				console.log(user);
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
	/* callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token;
			return session;
		},
	}, */
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

/* export default NextAuth(authOptions); */
