'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import TopCircle from '../../IconSvg/topCircle';
import BottomCircle from '../../IconSvg/bottomCircle';
import Button from '../../Button';
import styles from './styles.module.scss';

type SurveyEndProps = {
	onStart: () => void;
};

interface ServerAnswer {
	question: number;
	answer_choices: number[];
	other_text?: string;
}

const SURVEY_ANSWERS_KEY = 'survey_answers';
const SURVEY_SUBMIT_URL = process.env.NEXT_PUBLIC_SURVEY_SUBMIT_URL as string;

function SurveyEnd({ onStart }: SurveyEndProps) {
	const [email, setEmail] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isSubmitting || isSubmitted) return;
		setIsSubmitting(true);

		try {
			const raw = localStorage.getItem(SURVEY_ANSWERS_KEY);
			if (!raw) return;

			const { answers = [] } = JSON.parse(raw) as {
				answers?: ServerAnswer[];
			};

			await axios.post(SURVEY_SUBMIT_URL, {
				lead_email: email.trim(),
				answers,
			});

			localStorage.removeItem(SURVEY_ANSWERS_KEY);
			setIsSubmitted(true);

			timeoutRef.current = setTimeout(() => {
				setEmail('');
				setIsSubmitted(false);
				timeoutRef.current = null;
			}, 3000);
		} catch (err) {
			console.error('Ошибка отправки:', err);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.survey__container}>
			<TopCircle className={styles.survey__svg_top} />

			<h2 className={styles.survey__title}>
				<span className={styles.survey__title_span}>Спасибо!</span>
				Ваши ответы помогут улучшить цифровое обучение в промышленности
			</h2>

			<p className={styles.survey__description}>
				Если остались идеи или предложения по улучшению — оставьте
				e‑mail, мы с Вами свяжемся
			</p>

			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					className={`${styles.form__email} ${isSubmitted ? styles.email__submitted : ''}`}
					type="email"
					placeholder="Введите E-mail"
					value={email}
					onChange={e => setEmail(e.target.value)}
					disabled={isSubmitted}
				/>

				<Button
					className={`
						${styles.form__button}
						${isSubmitted ? styles.button__submitted : ''}
					`}
					radius={4}
					width={256}
					height={48}
					text={isSubmitted ? 'ОТПРАВЛЕНО' : 'отправить'}
					type="submit"
				/>
			</form>

			<Button
				className={styles.survey__button}
				radius={4}
				width={776}
				height={48}
				text="протестировать тренажер"
				onClick={onStart}
				type="button"
			/>

			<BottomCircle className={styles.survey__svg_bottom} />
		</div>
	);
}

export default SurveyEnd;
