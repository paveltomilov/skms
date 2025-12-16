'use client';

import { useState, ChangeEvent, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';

// import Popup from '../Popup';
import Button from '../Button';
import ConsentCheckbox from '../ConsentCheckbox';
import styles from './styles.module.scss';

type FormValues = {
	name: string;
	company: string;
	email: string;
	phone: string;
};

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

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

const isValidEmailDomain = (email: string): boolean => {
	const atIndex = email.lastIndexOf('@');
	if (atIndex === -1) return false;
	const domainPart = email.slice(atIndex + 1);
	const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return domainRegex.test(domainPart);
};

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
					setEmailError('Email введен некорректно');
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
			await axios.post('http://127.0.0.1:8000/api/leads/', payload, {
				headers: { 'Content-Type': 'application/json' },
			});
			setStatus('success');
			// setForm({
			// 	name: '',
			// 	company: '',
			// 	email: '',
			// 	phone: '',
			// });
			setConsent(false);
		} catch (err) {
			console.error(err);
			setStatus('error');
			setConsent(false);
		} finally {
			setTimeout(() => setStatus('idle'), 30000);
		}
	};

	return status === 'success' || status === 'error' ? (
		<div className={styles.successContainer}>
			{status === 'success' ? (
				<div className={`${styles.form} ${styles.succes}`}>
					<div className={styles.succes__info}>
						<h2 className={styles.succes__title}>
							Спасибо,мы получили вашу заявку
						</h2>
						<p className={styles.succes__descr}>
							Наш специалист свяжется с вами в ближайшее время,
							чтобы уточнить детали и помочь с выбором решения
						</p>
					</div>
					<div className={styles.succes__img}>
						<Image
							src="/images/succes.png"
							alt=""
							width={268}
							height={274}
						/>
					</div>
				</div>
			) : (
				<div className={styles.form}>
					<h2 className={styles.form__title}>Ошибка при отправке</h2>
					<p>
						Попробуйте ещё раз позже или свяжитесь с нами напрямую.
					</p>
				</div>
			)}
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
					disabled={!isFormValid() || status === 'sending'}
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
