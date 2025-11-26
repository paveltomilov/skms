import { RecoveryFormData } from '@/shared/types/recovery';
import { ValidationLevel } from '@/shared/types/login';
import { InputProps } from '@/shared/types/inputLogin';
import {
	EMAIL_DOMAIN_MAX_LENGTH,
	EMAIL_LOCAL_MAX_LENGTH,
	EMAIL_MAX_LENGTH,
	emailPattern,
	PASSWORD_MAX_LENGTH
} from '@/shared/configs/login';
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
			if (!email) return ValidationLevel.EMPTY;
			if (email.length > EMAIL_MAX_LENGTH) return ValidationLevel.WARN;

			const atIndex:number = email.indexOf('@');

			if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) return ValidationLevel.WARN;

			const localPart:string = email.slice(0, atIndex);
			const domainPart:string = email.slice(atIndex + 1);

			if (localPart.length > EMAIL_LOCAL_MAX_LENGTH
				|| domainPart.length > EMAIL_DOMAIN_MAX_LENGTH) return ValidationLevel.WARN;
			if (!emailPattern.test(email)) return ValidationLevel.WARN;

			return ValidationLevel.EMPTY;
		},
	},
	{
		name: 'password',
		required: true,
		errorMessage: 'Пароль введён неверно',
		warnMessage: 'Пароль введен некорректно',
		validate: (state: RecoveryFormData) => {
			const password:string = state.password.trim();

			if (!password) return ValidationLevel.EMPTY;
			if (password.length > PASSWORD_MAX_LENGTH) return ValidationLevel.WARN;
			if (!passwordPattern.test(password)) return ValidationLevel.WARN;

			return ValidationLevel.EMPTY;
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
			
			if (!password && !confirmPassword) return ValidationLevel.EMPTY;
			if (confirmPassword && state.password !== state.confirm_password) return ValidationLevel.WARN;
			
			return ValidationLevel.EMPTY;
		},
	},
];

export const initialStateRecovery: RecoveryFormData = {
	email: '',
	password: '',
	confirm_password: '',
};
