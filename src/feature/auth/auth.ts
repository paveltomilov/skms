import { authConfig } from '@public/auth.config';
import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

/* interface UserTokens {
	refresh: string;
	access: string;
} */

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: 'Username',
					type: 'text',
					placeholder: 'jsmith',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const credentialDetails = {
					username: credentials.username,
					password: credentials.password,
				};

				const resp = await fetch(
					`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(credentialDetails),
					},
				);
				const user = (await resp.json()) as User;
				if (user) {
					return user;
				} else {
					console.log('check your credentials');
					return null;
				}
			},
		}),
	],
});
