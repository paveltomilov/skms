import { RecoveryFormData } from '@/shared/types/recovery';
import { ValidationLevel } from '@/shared/types/login';
import { InputProps } from '@/shared/types/inputLogin';
import {emailPattern} from '@/shared/configs/login';
import {passwordPattern} from '@/shared/configs/login';

type Recovery = (InputProps & {
	validate?: (state: RecoveryFormData) => ValidationLevel;
	name: keyof RecoveryFormData;
})[];

export const configRecovery: Recovery = [
	{
		name: 'email',
		required: true,
		errorMessage: 'Пользователь с таким E-mail не существует',
		warnMessage:
			'E-mail не может содержать кириллицу и должен быть корректным',
		validate: (state: RecoveryFormData) => {
			const email: string = state.email?.trim();
			if (!email) return 0;
			if (email.length > 254) return 2;

			const atIndex:number = email.indexOf('@');

			if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) return 2;

			const localPart:string = email.slice(0, atIndex);
			const domainPart:string = email.slice(atIndex + 1);

			if (localPart.length > 64 || domainPart.length > 63) return 2;
			if (!emailPattern.test(email)) return 2;

			return 0;
		},
	},
	{
		name: 'password',
		required: true,
		errorMessage: 'Пароль введён неверно',
		warnMessage: 'Пароль введен некорректно',
		validate: (state: RecoveryFormData) => {
			const password:string = state.password.trim();

			if (!password) return 0;
			if (!passwordPattern.test(password)) return 2;

			return 0;
		},
	},
	{
		name: 'confirm_password',
		required: true,
		errorMessage: 'Пароли не совпадают',
		warnMessage: 'Пароли должны совпадать',
		validate: (state: RecoveryFormData) => {
			const password:string = state.password.trim();
			const confirmPassword:string = state.confirm_password.trim();
			
			if (!password && !confirmPassword) return 0;
			if (confirmPassword && state.password !== state.confirm_password) return 2;
			
			return 0;
		},
	},
];

export const initialStateRecovery: RecoveryFormData = {
	email: '',
	password: '',
	confirm_password: '',
};
