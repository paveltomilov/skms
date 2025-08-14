'use client';

import Button from '@/shared/UI/Button';
import styles from './styles.module.scss';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, FormEventHandler } from 'react';
import LoginInput from '../../shared/UI/LoginInput';
import Link from 'next/link';
import {
	getDone,
	getIndicator,
} from '@/shared/utils/loginFunctions/loginFunctions';
import { useLoginForm } from '@/shared/hooks/useLoginForn';

interface FormProps {
	toggleRegisterMode?: boolean;
	activateModalSuccess?: (value: boolean) => void;
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
		handleChange,
		resetServerErrors,
		// setServerErrors,
		validateForm,
	} = useLoginForm({ toggleRegisterMode });

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();

		resetServerErrors();

		if (!validateForm()) return;

		if (toggleRegisterMode) {
			if (activateModalSuccess) {
				activateModalSuccess(true);
			}
			// Можно добавить логику регистрации
		} else {
			const res = (await signIn('credentials', {
				username: values.login,
				password: values.password,
				redirect: false,
			})) as { error?: string } | undefined;

			if (res && !res.error) {
				router.push('/');
			} else {
				// Обработка ошибок сервера, например:
				// setServerErrors({ login: true, email: false, password: true });
			}
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<LoginInput
				label={'Логин'}
				type={'text'}
				name={'login'}
				onChange={handleChange}
				value={values.login}
				placeholder={'Логин'}
				id={'login'}
				indicator={getIndicator(
					'login',
					values,
					validationStatus,
					serverErrors,
				)}
				done={getDone(
					'login',
					values,
					validationStatus,
					serverErrors,
					activeFields,
				)}
				error={serverErrors.login}
				warn={!serverErrors.login && validationStatus.login === 2}
				errorMessage={
					serverErrors.login
						? configMap.login?.errorMessage
						: undefined
				}
				warnMessage={
					!serverErrors.login && validationStatus.login === 2
						? configMap.login?.warnMessage
						: undefined
				}
				required
			/>
			<LoginInput
				label={'Пароль'}
				type={'password'}
				name={'password'}
				onChange={handleChange}
				value={values.password}
				placeholder={'Пароль'}
				id={'password'}
				indicator={getIndicator(
					'password',
					values,
					validationStatus,
					serverErrors,
				)}
				done={getDone(
					'password',
					values,
					validationStatus,
					serverErrors,
					activeFields,
				)}
				error={serverErrors.password}
				warn={!serverErrors.password && validationStatus.password === 2}
				errorMessage={
					serverErrors.password
						? configMap.password?.errorMessage
						: undefined
				}
				warnMessage={
					!serverErrors.password && validationStatus.password === 2
						? configMap.password?.warnMessage
						: undefined
				}
				required
			/>
			{toggleRegisterMode && (
				<LoginInput
					label={'Email'}
					type={'email'}
					name={'email'}
					onChange={handleChange}
					value={values.email || ''}
					placeholder={'Email'}
					id={'email'}
					indicator={getIndicator(
						'email',
						values,
						validationStatus,
						serverErrors,
					)}
					done={getDone(
						'email',
						values,
						validationStatus,
						serverErrors,
						activeFields,
					)}
					error={serverErrors.email}
					warn={!serverErrors.email && validationStatus.email === 2}
					errorMessage={
						serverErrors.email
							? configMap.email?.errorMessage
							: undefined
					}
					warnMessage={
						!serverErrors.email && validationStatus.email === 2
							? configMap.email?.warnMessage
							: undefined
					}
					required={configMap.email?.required}
				/>
			)}
			<div
				className={`${styles.form_inner} ${
					toggleRegisterMode ? styles.policy : ''
				}`}
			>
				<label className={styles.form_inner_label}>
					<input
						type={'checkbox'}
						name={toggleRegisterMode ? 'policy' : 'remember'}
						className={styles.form_inner_label__checkbox}
					/>
					{toggleRegisterMode ? 'Соглашаюсь на' : 'Запомнить'}
				</label>
				<Link
					href={toggleRegisterMode ? '/policy' : '/recovery'}
					className={styles.form_inner__forget}
				>
					{toggleRegisterMode
						? 'обработку персональных данных'
						: 'Забыли пароль?'}
				</Link>
			</div>
			<Button
				width={toggleRegisterMode ? 278 : 171}
				height={55}
				aria-label={toggleRegisterMode ? 'Подтвердить' : 'Войти'}
				text={toggleRegisterMode ? 'Подтвердить' : 'Войти'}
				className={styles.form__button}
				disabled={!isValid}
			/>
		</form>
	);
};

export default Form;
