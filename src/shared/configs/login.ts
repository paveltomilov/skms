import { LoginFormData, ValidationLevel } from '@/shared/types/login';
import { InputProps } from '@/shared/types/inputLogin';

type Login = (InputProps & {
	validate?: (state: LoginFormData) => ValidationLevel;
	name: keyof LoginFormData;
})[];

export const emailPattern: RegExp = /^(?![_.-])(?!\s)(?!.*[-.]{2})(?!.*[-]@)(?!.*@[-])(?!.*[.]@)(?!.*@[.])(?!.*\.[.])(?![a-zA-Z0-9._%+-]*[.]@)[a-zA-Z0-9._%+-]+@(?![-])(?![.])[a-zA-Z0-9.-]+(?<![-])(?<![.])\.[a-zA-Z]{2,}(?<!\s)$/;
export const passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[._{}[\]()<>?|~`'"\\/;:+=%$^&*,-@#!])(?!.*[а-яёА-ЯЁ])(?!(.*[^a-zA-Z0-9]){6})[a-zA-Z0-9._{}[\]()<>?|~`'"\\/;:+=%$^&*,-@#!]{12,}$/;
const latinPattern: RegExp = /^(?!.*[-\s]{2,})[A-Za-z0-9]+(?:[-\s][A-Za-z0-9]+)*$/;

export const config: Login = [
	{
		name: 'email',
		required: true,
		errorMessage: 'Пользователь с таким E-mail уже существует',
		warnMessage: 'E-mail введен не корректно',
		validate: (state: LoginFormData) => {
			const email: string = state.email?.trim();

			if (!email) return 0;
			if (email.length > 254) return 2;

			const atIndex:number = email.indexOf('@');

			if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) return 2;

			const localPart:string = email.slice(0, atIndex);
			const domainPart:string = email.slice(atIndex + 1);

			if (localPart.length > 64 || domainPart.length > 63) return 2;
			if (!emailPattern.test(email)) return 2;

			return 3;
		},
	},
	{
		name: 'password',
		required: true,
		errorMessage: 'Пароль введен неверно',
		warnMessage: 'Пароль введен некорректно',
		validate: (state: LoginFormData) => {
			const password:string = state.password.trim();

			if (!password) return 0;
			if (!passwordPattern.test(password)) return 2;

			return 3; // OK
		},
	},
	{
		name: 'first_name',
		required: true,
		errorMessage: 'Имя введено неверно',
		warnMessage:
			'Поле может содержать только буквы латиницы, пробел, тире и цифры',
		validate: (state: LoginFormData) => {
			const name:string = state.first_name.trim();

			if (!name) return 0;
			if (name.length > 64) return 2;
			if (!latinPattern.test(name)) return 2;

			return 3; // OK
		},
	},
	{
		name: 'last_name',
		required: true,
		errorMessage: 'Фамилия введена неверно',
		warnMessage:
			'Поле может содержать только буквы латиницы, пробел, тире и цифры',
		validate: (state: LoginFormData) => {
			const surname: string = state.last_name.trim();

			if (!surname) return 0;
			if (surname.length > 64) return 2;
			if (!latinPattern.test(surname)) return 2;

			return 3; // OK
		},
	},
];

export const initialState: LoginFormData = {
	email: '',
	password: '',
	first_name: '',
	last_name: '',
};
