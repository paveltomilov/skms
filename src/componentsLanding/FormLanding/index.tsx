'use client';

import {
	useState,
	ChangeEvent,
	useCallback,
	useRef,
	useEffect,
	useMemo,
} from 'react';
import axios from 'axios';

import Popup from '../Popup';
import Button from '../Button';
import ConsentCheckbox from '../ConsentCheckbox';
import styles from './styles.module.scss';

interface PopupState {
	visible: boolean;
	message: string;
	variant?: 'success' | 'error' | 'info';
}

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

	const [popup, setPopup] = useState<PopupState>({
		visible: false,
		message: '',
		variant: undefined,
	});

	const [emailError, setEmailError] = useState<string | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const startTimer = useCallback(() => {
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			setPopup(prev => ({ ...prev, visible: false }));
		}, 4000);
	}, []);

	useEffect(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);

	const showPopup = (msg: string, variant: PopupState['variant'] = 'info') =>
		setPopup({ visible: true, message: msg, variant });

	const isFormValid = useMemo(() => {
		const allFieldsFilled = Object.values(form).some(v => v.trim() !== '');
		return allFieldsFilled && consent;
	}, [form, consent]);

	const handleInputChange = useCallback(
		(key: keyof FormValues) => (e: ChangeEvent<HTMLInputElement>) => {
			// const rawValue = e.target.value;
			// const value =
			// 	key === 'phone' ? rawValue.replace(/\D/g, '') : rawValue;
			const rawValue = e.target.value;
			const value = key === 'phone' ? rawValue : rawValue;

			setForm(prev => ({ ...prev, [key]: value }));

			if (key === 'email') {
				if (
					!value ||
					!value.includes('@') ||
					!isValidEmailDomain(value)
				)
					setEmailError('Email введен некорректно');
				else setEmailError(null);
			}
		},

		[],
	);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!isFormValid) return;

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

			setForm({ name: '', company: '', email: '', phone: '' });
			setConsent(false);
			showPopup(
				'Заявка успешно отправлена. Мы скоро с вами свяжемся',
				'success',
			);

			startTimer();
		} catch (err) {
			console.error(err);
			setForm({ name: '', company: '', email: '', phone: '' });
			setConsent(false);
			showPopup(
				'Ошибка при отправке заявки. Пожалуйста попробуйте позже',
				'error',
			);
		}
	};

	return (
		<>
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
							!isFormValid ? styles.buttonDisabled : ''
						}`}
						text={'ОТПРАВИТЬ'}
						type="submit"
						disabled={!isFormValid}
						width={604}
						height={40}
						radius={4}
						border="1px solid var(--lan-very-dark-gray)"
					/>
					<ConsentCheckbox value={consent} onChange={setConsent} />
				</div>
			</form>

			{popup.visible && (
				<Popup
					message={popup.message}
					variant={popup.variant}
					onClose={() =>
						setPopup({
							visible: false,
							message: '',
							variant: undefined,
						})
					}
				/>
			)}
		</>
	);
}

export default FormLanding;
