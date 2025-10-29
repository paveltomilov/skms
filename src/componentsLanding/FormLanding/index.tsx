'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import styles from './styles.module.scss';
import SectionTitle from '../SectionTitle';
import Button from '../Button';

type FormValues = {
	title: string; // Заголовок
	name: string; // ФИО
	company: string; // Компания
	email: string; // Почта
	phone: string; // Телефон
	consent: boolean; // Согласие на обработку персональных данных
};

function FormLanding() {
	const [form, setForm] = useState<FormValues>({
		title: '',
		name: '',
		company: '',
		email: '',
		phone: '',
		consent: false,
	});

	// Обработчик для текстовых полей
	const handleInputChange =
		(key: keyof Omit<FormValues, 'consent'>) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			setForm(prev => ({ ...prev, [key]: e.target.value }));
		};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Здесь можно послать данные на сервер
		console.log('Отправляем форму', form);
	};

	const [consent, setConsent] = useState(false);
	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<SectionTitle
				className={styles.form__title}
				title="Хотите узнать больше? Мы с вами свяжемся!"
			/>

			{/* ФИО */}
			<div className={styles.form__fio}>
				<label htmlFor="name" className={styles.label}>
					ФИО
				</label>
				<input
					id="name"
					type="text"
					value={form.name}
					onChange={handleInputChange('name')}
					className={styles.input}
					placeholder="ФИО"
					required
				/>
			</div>

			{/* Компания */}
			<div className={styles.form__company}>
				<label htmlFor="company" className={styles.label}>
					Компания
				</label>
				<input
					id="company"
					type="text"
					value={form.company}
					onChange={handleInputChange('company')}
					className={styles.input}
					placeholder="Название компании "
				/>
			</div>

			{/* Почта */}
			<div className={styles.form__mail}>
				<label htmlFor="email" className={styles.label}>
					Почта
				</label>
				<input
					id="email"
					type="email"
					value={form.email}
					onChange={handleInputChange('email')}
					className={styles.input}
					placeholder="Введите Вашу почту "
					required
				/>
			</div>

			{/* Телефон */}
			<div className={styles.form__telephone}>
				<label htmlFor="phone" className={styles.label}>
					Телефон
				</label>
				<input
					id="phone"
					type="tel"
					value={form.phone}
					onChange={handleInputChange('phone')}
					className={styles.input}
					placeholder="Ваш номер телефона "
				/>
			</div>

			<div className={styles.form__sogl}>
				<div className={styles.form__button}>
					<Button
						text="отправить"
						color="var(--lan-very-dark-mostly-black-blue)"
						bgColor="var(--lan-bright-cyan---lime-green)" // основной цвет кнопки
						hoverBgColor="var(--lan-moderate-cyan)" // цвет при наведении
						activeBgColor="var(--lan-gray)" // цвет при нажатии
						focusOutlineColor="var(--lan-moderate-cyan)" // outline при фокусе
						width={504}
						height={40}
						radius={4}
						border="1px solid var(--lan-very-dark-gray)"
					/>
				</div>
				<div className={styles.form__check}>
					<input
						className={styles.input__checkbox}
						id="consent"
						type="checkbox"
						checked={consent}
						onChange={() => setConsent(prev => !prev)}
						required
					/>
					<label htmlFor="consent" className={styles.checkbox__descr}>
						Я даю согласие на обработку &nbsp;
						<span className={styles.checkbox__descr_span}>
							персональных данных
						</span>
					</label>
				</div>
			</div>
		</form>
	);
}

export default FormLanding;
