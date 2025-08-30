import { LoginFormData, ValidationLevel } from '@/shared/types/login';
import { InputProps } from '@/shared/types/inputLogin';

type Login = (InputProps & {
	validate?: (state: LoginFormData) => ValidationLevel;
	name: keyof LoginFormData;
})[];

export const config: Login = [
	{
		name: 'email',
		required: true,
		errorMessage: 'Пользователь с таким E-mail уже существует',
		warnMessage: 'E-mail введен не корректно',
		validate: (state: LoginFormData) => {
			if (!state.email || !state.email.trim()) return 0;
			const emailPattern = /^\S+@\S+\.\S+$/;
			if (!emailPattern.test(state.email)) return 2;
			return 0;
		},
	},
	{
		name: 'password',
		required: true,
		errorMessage: 'Пароль введен неверно',
		warnMessage:
			'Пароль не должен содержать в себе символы @, #, ! и также кириллицу',
		validate: (state: LoginFormData) => {
			if (!state.password.trim()) return 0;

			const forbiddenSymbolsPattern = /[@#!]/;
			const cyrillicPattern = /[а-яёА-ЯЁ]/;
			if (
				forbiddenSymbolsPattern.test(state.password) ||
				cyrillicPattern.test(state.password)
			)
				return 2;
			return 0;
		},
	},
];

export const initialState: LoginFormData = {
	email: '',
	password: '',
};
