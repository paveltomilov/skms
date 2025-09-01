'use client';

import Button from '@/shared/UI/Button';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { FC, FormEventHandler } from 'react';
import LoginInput from '../../shared/UI/LoginInput';
import Link from 'next/link';
import {
	getDone,
	getIndicator,
} from '@/shared/utils/loginFunctions/loginFunctions';
import { useLoginForm } from '@/shared/hooks/useLoginForn';
import { postAuth } from '@/shared/lib/auth';

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
		configMap,
		handleChange,
		resetServerErrors,
		setServerErrors,
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
			try {
				const response = await postAuth(values);
				if (response) {
					router.push('/ptk');
				} else {
					setServerErrors({ email: false, password: true });
				}
			} catch {
				console.error('Ошибка при аутентификации');
				setServerErrors({ email: false, password: true });
			}
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
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
				done={getDone('email', values, validationStatus, serverErrors)}
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
