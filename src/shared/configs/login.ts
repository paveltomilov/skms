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
			const email = state.email?.trim();

			if (!email) return 0;

			// Разрешаем только ASCII email: буквы/цифры и ._%+- в локальной части, домен из латиницы/цифр/.-
			const emailPattern =
				/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

			if (!emailPattern.test(email)) return 2;

			return 3;
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
			) {
				return 2;
			}

			if (state.password.length < 6) return 2;

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
			if (!state.first_name.trim()) return 0;

			const latinPattern =
				/^(?!.*[-\s]{3,})[A-Za-z0-9]+(?:[-\s][A-Za-z0-9]+)*$/;

			if (!latinPattern.test(state.first_name.trim())) return 2;

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
			if (!state.last_name.trim()) return 0;

			const latinPattern =
				/^(?!.*[-\s]{3,})[A-Za-z0-9]+(?:[-\s][A-Za-z0-9]+)*$/;

			if (!latinPattern.test(state.last_name.trim())) return 2;

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
