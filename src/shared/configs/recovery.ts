import { RecoveryFormData } from '@/shared/types/recovery';
import { ValidationLevel } from '@/shared/types/login';
import { InputProps } from '@/shared/types/inputLogin';

type Recovery = (InputProps & {
	validate?: (state: RecoveryFormData) => ValidationLevel;
	name: keyof RecoveryFormData;
})[];

export const configRecovery: Recovery = [
	{
		name: 'email',
		required: true,
		errorMessage: 'Пользователь с таким E-mail не существует',
		warnMessage: 'E-mail введён некорректно',
		validate: (state: RecoveryFormData) => {
			if (!state.email || !state.email.trim()) return 0;
			
			const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			
			if (!emailPattern.test(state.email)) return 2;
			return 0;
		},
	},
	{
		name: 'password',
		required: true,
		errorMessage: 'Пароль введён неверно',
		warnMessage: 'Пароль не должен содержать символы @, #, ! и кириллицу',
		validate: (state: RecoveryFormData) => {
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
	{
		name: 'confirm_password',
		required: true,
		errorMessage: 'Пароли не совпадают',
		warnMessage: 'Пароли должны совпадать',
		validate: (state: RecoveryFormData) => {
			if (!state.password.trim() && !state.confirm_password.trim())
				return 0;
			if (
				state.confirm_password.trim() &&
				state.password !== state.confirm_password
			)
				return 2;
			return 0;
		},
	},
];

export const initialStateRecovery: RecoveryFormData = {
	email: '',
	password: '',
	confirm_password: '',
};
