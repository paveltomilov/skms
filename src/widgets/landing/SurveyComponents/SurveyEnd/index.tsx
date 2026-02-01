'use client';

import React, { useState } from 'react';
import TopCircle from '../../IconSvg/topCircle';
import BottomCircle from '../../IconSvg/bottomCircle';
import Button from '../../Button';
import styles from './styles.module.scss';

type SurveyEndProps = {
	onStart: () => void;
	email?: string;
};

const SurveyEnd: React.FC<SurveyEndProps> = ({ onStart }) => {
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!email.trim() || isSubmitting || isSubmitted) return;

		setIsSubmitting(true);

		try {
			setIsSubmitted(true);

			setTimeout(() => {
				setIsSubmitted(false);
				setEmail('');
			}, 4000);
		} catch (error) {
			console.error('Ошибка отправки:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const isButtonDisabled = !email.trim() || isSubmitting || isSubmitted;
	return (
		<div className={styles.survey__container}>
			<TopCircle className={styles.survey__svg_top} />

			<h2 className={styles.survey__title}>
				<span className={styles.survey__title_span}>Спасибо!</span>
				Ваши ответы помогут улучшить цифровое обучение в промышленности
			</h2>

			<p className={styles.survey__description}>
				Если остались идеи или предложения по улучшению — оставьте
				e-mail, мы с Вами свяжемся
			</p>

			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					className={`${styles.form__email} ${isSubmitted ? styles.email__submitted : ''}`}
					type="email"
					placeholder="Введите E-mail"
					value={email}
					onChange={handleEmailChange}
					required
				/>
				<Button
					className={`
        ${styles.form__button}
        ${isButtonDisabled ? styles.button__disabled : ''}
        ${isSubmitted ? styles.button__submitted : ''}
    `}
					radius={4}
					text={isSubmitted ? 'ОТПРАВЛЕНО' : 'отправить'}
					type="submit"
				/>
			</form>

			<Button
				className={styles.survey__button}
				radius={4}
				text="протестировать тренажер"
				onClick={onStart}
				type="button"
			/>

			<BottomCircle className={styles.survey__svg_bottom} />
		</div>
	);
};

export default SurveyEnd;
