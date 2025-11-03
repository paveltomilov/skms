import { useCallback, useEffect, useRef, useState } from 'react';
import {
	requestPasswordReset,
	verifyRecoveryCode,
} from '@/shared/lib/passwordRecovery';

export const useRecoveryCode = (initialCount = 60) => {
	const [code, setCode] = useState<string[]>(['_', '_', '_', '_', '_', '_']);
	const [validationStatus, setValidationStatus] = useState<boolean | null>(
		null,
	);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [count, setCount] = useState<number>(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const timerIdRef = useRef<NodeJS.Timeout | null>(null);
	const [email, setEmail] = useState<string>('');

	const focusInput = useCallback(() => {
		inputRef.current?.focus();
	}, []);

	const isComplete = code.every(ch => ch !== '_' && /\d/.test(ch));

	const startTimer = useCallback(() => {
		setCount(initialCount);
		try {
			if (email) {
				localStorage.setItem(
					`recovery:lastSentAt:${email}`,
					String(Date.now()),
				);
			}
		} catch {}
	}, [initialCount, email]);

	const clearTimer = useCallback(() => {
		if (timerIdRef.current) {
			clearInterval(timerIdRef.current);
			timerIdRef.current = null;
		}
	}, []);

	useEffect(() => {
		if (count === 0) {
			clearTimer();
			return;
		}
		if (timerIdRef.current) {
			clearTimer();
		}
		timerIdRef.current = setInterval(() => {
			setCount(prev => {
				if (prev <= 1) {
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		
		return () => clearTimer();
	}, [count, clearTimer]);

	// Инициализация email и восстановления таймера из localStorage
	useEffect(() => {
		try {
			const storedEmail = localStorage.getItem('recovery:email') || '';
			setEmail(storedEmail);
			if (storedEmail) {
				const last = localStorage.getItem(
					`recovery:lastSentAt:${storedEmail}`,
				);
				if (last) {
					const elapsed = Math.floor(
						(Date.now() - Number(last)) / 1000,
					);
					const remain = Math.max(initialCount - elapsed, 0);
					if (remain > 0) setCount(remain);
				}
			}
		} catch {}
	}, [initialCount]);

	const handleChange = useCallback((val: string) => {
		val = val.replace(/\D/g, '').slice(0, 6);
		const newCode = Array(6).fill('_');
		val.split('').forEach((ch, i) => (newCode[i] = ch));
		setCode(newCode);
		setValidationStatus(null);
		setErrorMessage('');
	}, []);

	const handleKeyDown = useCallback(
		(e: { key: string; preventDefault: () => void }) => {
			if (e.key === 'Backspace') {
				e.preventDefault();
				const currentVal = code.join('').replace(/_/g, '');
				const newVal = currentVal.slice(0, -1);
				const newCode = Array(6).fill('_');
				newVal.split('').forEach((ch, i) => (newCode[i] = ch));
				setCode(newCode);
				setValidationStatus(null);
				setErrorMessage('');
			}
		},
		[code],
	);

	const handleSubmit = useCallback(async () => {
		if (!isComplete) {
			setValidationStatus(false);
			setErrorMessage('Код должен содержать 6 символов');
			return false;
		}
		const codeStr = code.join('');
		// Запрос на сервер
		try {
			const res = await verifyRecoveryCode(codeStr);
			if (res.success && res.data.session_token) {
				setValidationStatus(true);
				setErrorMessage('');
				try {
					localStorage.setItem(
						'recovery:session_token',
						res.data.session_token,
					);
				} catch {}
				return true;
			}
			setValidationStatus(false);
			setErrorMessage(
				res.success
					? 'Неверный код'
					: res.errors?.detail || 'Ошибка проверки кода',
			);
			return false;
		} catch {
			setValidationStatus(false);
			setErrorMessage('Ошибка проверки кода');
			return false;
		}
	}, [code, isComplete]);

	const handleRequestCode = useCallback(async () => {
		if (!email) return;
		const res = await requestPasswordReset(email);
		if (res.success) {
			startTimer();
		} else {
			setErrorMessage(res.errors?.detail || 'Не удалось отправить код');
		}
	}, [startTimer, email]);

	useEffect(() => {
		focusInput();
	}, [focusInput]);

	return {
		code,
		validationStatus,
		errorMessage,
		count,
		inputRef,
		isComplete,
		startTimer,
		focusInput,
		handleChange,
		handleKeyDown,
		handleSubmit,
		handleRequestCode,
	};
};
