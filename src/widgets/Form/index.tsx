'use client';

import Button from '@/shared/UI/Button';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { FC, FormEventHandler, useState } from 'react';
import LoginInput from '../../shared/UI/LoginInput';
import Link from 'next/link';
import {
	getDone,
	getIndicator,
} from '@/shared/utils/loginFunctions/loginFunctions';
import { useLoginForm } from '@/shared/hooks/useLoginForm';
import { postAuth } from '@/shared/lib/auth';
import { postRegistration } from '@/shared/lib/registration';
import { LoginFormData } from '@/shared/types/login';

interface FormProps {
	toggleRegisterMode: 'register' | 'login' | 'createUser';
	activateModalSuccess?: (value: boolean) => void;
}
const PASSWORD_ERROR = {
	email: false,
	password: true,
	first_name: false,
	last_name: false,
};
export interface FieldConfig {
	name: keyof LoginFormData;
	label: string;
	type: string;
	placeholder: string;
}

const Form: FC<FormProps> = ({ toggleRegisterMode, activateModalSuccess }) => {
	const router = useRouter();
	const {
		values,
		validationStatus,
		serverErrors,
		isValid,
		activeFields,
		configMap,
		rememberMe,
		policyAccepted,
		handleChange,
		handleRememberMeChange,
		handlePolicyChange,
		resetServerErrors,
		setServerErrors,
		validateForm,
	} = useLoginForm({ toggleRegisterMode });

	const [authErrorText, setAuthErrorText] = useState<string | undefined>(
		undefined,
	);

	// Конфигурация полей формы
	const fieldConfigs: FieldConfig[] = [
		...((toggleRegisterMode === 'register'
			? [
					{
						name: 'first_name',
						label: 'Имя',
						type: 'text',
						placeholder: 'Имя',
					},
					{
						name: 'last_name',
						label: 'Фамилия',
						type: 'text',
						placeholder: 'Фамилия',
					},
			  ]
			: []) as FieldConfig[]),
		{ 	name: 'email', 
		  	label: 'Email', 
		  	type: 'email', 
		  	placeholder: 'Email' 
		},
		{
			name: 'password',
			label: 'Пароль',
			type: 'password',
			placeholder: 'Пароль',
		},
	];

	// Функция для рендеринга поля
	const renderField = (field: FieldConfig) => {
		const { name, label, type, placeholder } = field;
		const hasError = serverErrors[name];
		const hasWarn = !hasError && validationStatus[name] === 2;

		const customErrorText = name === 'password' ? authErrorText : undefined;
		return (
			<LoginInput
				key={name}
				label={label}
				type={type}
				name={name}
				onChange={handleChange}
				value={values[name] || ''}
				placeholder={placeholder}
				id={name}
				indicator={getIndicator(
					name,
					values,
					validationStatus,
					serverErrors,
				)}
				done={getDone(
					name,
					values,
					validationStatus,
					serverErrors,
					activeFields,
				)}
				error={hasError}
				warn={hasWarn}
				errorMessage={
					hasError
						? customErrorText || configMap[name]?.errorMessage
						: undefined
				}
				warnMessage={hasWarn ? configMap[name]?.warnMessage : undefined}
				required={configMap[name]?.required}
			/>
		);
	};

	// Обработка регистрации
	const handleRegistration = async () => {
		try {
			const response = await postRegistration(values);

			if (response.success && activateModalSuccess) {
				activateModalSuccess(true);
			}

			if (response.errors) {
				setServerErrors({
					email: !!response.errors.email,
					password: !!response.errors.password,
					first_name: !!response.errors.first_name,
					last_name: !!response.errors.last_name,
				});
			}
		} catch {
			setServerErrors(PASSWORD_ERROR);
		}
	};

	// Обработка авторизации
	const handleAuth = async () => {
		try {
			const response = await postAuth(values, rememberMe);
			if (response.success) {
				router.push('/ptk');
			} else {
				setServerErrors(PASSWORD_ERROR);
				setAuthErrorText(
					response.errorText || 'Неверные учётные данные',
				);
			}
		} catch {
			setServerErrors(PASSWORD_ERROR);
		}
	};
	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();
		resetServerErrors();

		if (!validateForm()) return;

		if (toggleRegisterMode === 'register') {
			await handleRegistration();
		} else {
			await handleAuth();
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			{fieldConfigs.map(renderField)}

			<div
				className={`${styles.form_inner} ${
					toggleRegisterMode === 'register' ? styles.policy : ''
				}`}
			>
				<label className={styles.form_inner_label}>
					<input
						type="checkbox"
						name={toggleRegisterMode === 'register' ? 'policy' : 'remember'}
						className={styles.form_inner_label__checkbox}
						checked={
							toggleRegisterMode === 'register' ? policyAccepted : rememberMe
						}
						onChange={e =>
							toggleRegisterMode === 'register'
								? handlePolicyChange(e.target.checked)
								: handleRememberMeChange(e.target.checked)
						}
					/>
					{toggleRegisterMode === 'register' ? 'Соглашаюсь на' : 'Запомнить'}
				</label>
				<Link
					href={toggleRegisterMode === 'register' ? '/policy' : '/recovery'}
					className={styles.form_inner__forget}
				>
					{toggleRegisterMode === 'register'
						? 'обработку персональных данных'
						: 'Забыли пароль?'}
				</Link>
			</div>

			<Button
				width={toggleRegisterMode === 'register' ? 278 : 171}
				height={55}
				aria-label={toggleRegisterMode === 'register' ? 'Подтвердить' : 'Войти'}
				text={toggleRegisterMode === 'register' ? 'Подтвердить' : 'Войти'}
				className={styles.form__button}
				disabled={!isValid}
			/>
		</form>
	);
};

export default Form;
