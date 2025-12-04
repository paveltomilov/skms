import { LoginFormData, ValidationLevel } from '@/shared/types/login';
import { InputProps } from '@/shared/types/inputLogin';

type Login = (InputProps & {
	validate?: (state: LoginFormData) => ValidationLevel;
	name: keyof LoginFormData;
})[];

export const emailPattern: RegExp = /^(?![_.-])(?!\s)(?!.*[-.]{2})(?!.*[-]@)(?!.*@[-])(?!.*[.]@)(?!.*@[.])(?!.*\.[.])(?![a-zA-Z0-9._%+-]*[.]@)[a-zA-Z0-9._%+-]+@(?![-])(?![.])[a-zA-Z0-9.-]+(?<![-])(?<![.])\.[a-zA-Z]{2,}(?<!\s)$/;
export const passwordPattern: RegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[._{}[\]()<>?|~`'"\\/;:+=%$^&*,-@#!])(?!.*[а-яёА-ЯЁ])(?!(.*[^a-zA-Z0-9]){6})[a-zA-Z0-9._{}[\]()<>?|~`'"\\/;:+=%$^&*,-@#!]{12,}$/;
const latinPattern: RegExp = /^(?!.*[-\s]{2,})[A-Za-z0-9]+(?:[-\s][A-Za-z0-9]+)*$/;
export const EMAIL_MAX_LENGTH: number = 254;
export const EMAIL_LOCAL_MAX_LENGTH: number = 64;
export const EMAIL_DOMAIN_MAX_LENGTH: number = 63;
export const PASSWORD_MIN_LENGTH: number = 12;
export const PASSWORD_MAX_LENGTH: number = 100;
export const NAME_SURNAME_MAX_LENGTH: number = 64;

export const config: Login = [
	{
		name: 'email',
		required: true,
		errorMessage: 'Пользователь с таким E-mail уже существует',
		warnMessage: 'E-mail введен не корректно',
		validate: (state: LoginFormData) => {
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

			return ValidationLevel.SUCCESS;
		},
	},
	{
		name: 'password',
		required: true,
		errorMessage: 'Пароль введен неверно',
		warnMessage: 'Пароль введен некорректно',
		validate: (state: LoginFormData) => {
			const password:string = state.password.trim();

			if (!password) return ValidationLevel.EMPTY;
			if (password.length > PASSWORD_MAX_LENGTH) return ValidationLevel.WARN;
			if (!passwordPattern.test(password)) return ValidationLevel.WARN;

			return ValidationLevel.SUCCESS; // OK
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

			if (!name) return ValidationLevel.EMPTY;
			if (name.length > NAME_SURNAME_MAX_LENGTH) return ValidationLevel.WARN;
			if (!latinPattern.test(name)) return ValidationLevel.WARN;

			return ValidationLevel.SUCCESS; // OK
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

			if (!surname) return ValidationLevel.EMPTY;
			if (surname.length > NAME_SURNAME_MAX_LENGTH) return ValidationLevel.WARN;
			if (!latinPattern.test(surname)) return ValidationLevel.WARN;

			return ValidationLevel.SUCCESS; // OK
		},
	},
];

export const initialState: LoginFormData = {
	email: '',
	password: '',
	first_name: '',
	last_name: '',
};

