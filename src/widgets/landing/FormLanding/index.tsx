'use client';

import { useState, ChangeEvent, useCallback } from 'react';
import { FormValues, SubmitStatus } from '@/shared/types/form';
import { postLead } from '@/shared/api/leads/postLead';
import { isValidEmailDomain } from '@/shared/utils/emailUtils/emailUtils';
import Button from '../Button';
import ConsentCheckbox from '../ConsentCheckbox';
import styles from './styles.module.scss';
import SuccesForm from '../SuccesForm';
import ErrorForm from '../ErrorForm';

const fields = [
	{ key: 'name', label: 'Ваше имя', type: 'text', placeholder: 'ФИО' },
	{
		key: 'email',
		label: 'Почта',
		type: 'text',
		placeholder: 'Введите Вашу почту',
	},
	{
		key: 'company',
		label: 'Компания',
		type: 'text',
		placeholder: 'Название компании',
	},
	{
		key: 'phone',
		label: 'Телефон',
		type: 'tel',
		placeholder: 'Ваш номер телефона',
	},
] as const;

interface FormFieldProps {
	label: string;
	value: string | number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	placeholder?: string;
	error?: string | null;
}

const FormField: React.FC<FormFieldProps> = ({
	label,
	value,
	onChange,
	error,
	...rest
}) => (
	<div className={styles.form__field}>
		<label htmlFor={label} className={styles.label}>
			{label}
		</label>

		<input
			id={label}
			value={value}
			onChange={onChange}
			aria-invalid={!!error}
			aria-describedby={error ? `${label}-error` : undefined}
			className={`${styles.input} ${error ? styles.inputError : ''}`}
			{...rest}
		/>

		{error && (
			<p id={`${label}-error`} className={styles.errorMsg}>
				{error}
			</p>
		)}
	</div>
);

function FormLanding() {
	const [form, setForm] = useState<FormValues>({
		name: '',
		company: '',
		email: '',
		phone: '',
	});

	const [consent, setConsent] = useState(false);
	const [emailError, setEmailError] = useState<string | null>(null);
	const [status, setStatus] = useState<SubmitStatus>('idle');

	const handleInputChange = useCallback(
		(key: keyof FormValues) => (e: ChangeEvent<HTMLInputElement>) => {
			const rawValue = e.target.value;

			setForm(prev => ({ ...prev, [key]: rawValue }));

			if (key === 'email') {
				if (
					!rawValue ||
					!rawValue.includes('@') ||
					!isValidEmailDomain(rawValue)
				)
					setEmailError(
						'Похоже, в email есть опечатка.\nПроверьте, пожалуйста, введенные данные',
					);
				else setEmailError(null);
			}
		},

		[],
	);

	const isFormValid = () => {
		const { name, company, email, phone } = form;
		return (
			!!name && !!company && !!email && !!phone && !emailError && consent
		);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isFormValid()) return;

		setStatus('sending');

		const payload = {
			full_name: form.name,
			company: form.company,
			email: form.email,
			phone: form.phone,
		};

		try {
			await postLead(payload);
			setStatus('success');

			setConsent(false);
		} catch {
			setStatus('error');
			setConsent(false);
		} finally {
			setForm({
				name: '',
				company: '',
				email: '',
				phone: '',
			});
			setTimeout(() => setStatus('idle'), 8000);
		}
	};

	return status === 'success' || status === 'error' ? (
		<div className={styles.successContainer}>
			{status === 'success' ? <SuccesForm /> : <ErrorForm />}
		</div>
	) : (
		<form onSubmit={handleSubmit} className={styles.form}>
			<h2 className={styles.form__title}>
				Хотите&nbsp;узнать&nbsp;больше? Мы&nbsp;с вами свяжемся!
			</h2>
			<div className={styles.form__container}>
				{fields.map(({ key, label, type, placeholder }) => (
					<FormField
						key={key}
						label={label}
						value={form[key]}
						onChange={handleInputChange(key)}
						type={type}
						placeholder={placeholder}
						error={key === 'email' ? emailError : undefined}
					/>
				))}
			</div>

			<div className={styles.form__sogl}>
				<Button
					className={`${styles.form__button} ${
						isFormValid() ? styles.btnValid : styles.btnInvalid
					}`}
					text={'ОТПРАВИТЬ'}
					type="submit"
					width={604}
					height={40}
					radius={4}
					border="1px solid var(--lan-very-dark-gray)"
				/>
				<ConsentCheckbox value={consent} onChange={setConsent} />
			</div>
		</form>
	);
}

export default FormLanding;
