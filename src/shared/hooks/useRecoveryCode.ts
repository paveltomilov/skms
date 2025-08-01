import {useCallback, useEffect, useRef, useState} from 'react';

export const useRecoveryCode = (initialCount = 60) => {
    const [code, setCode] = useState<string[]>(['_', '_', '_', '_', '_', '_']);
    const [validationStatus, setValidationStatus] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const timerIdRef = useRef<NodeJS.Timeout | null>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    const isComplete = code.every(ch => ch !== '_' && /\d/.test(ch));

    const startTimer = useCallback(() => {
        setCount(initialCount);
    }, [initialCount]);

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
        if (!timerIdRef.current) {
            timerIdRef.current = setInterval(() => {
                setCount(prev => {
                    if (prev <= 1) {
                        clearTimer();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearTimer();
    }, [count, clearTimer]);

    const handleChange = useCallback((val: string) => {
        val = val.replace(/\D/g, '').slice(0, 6);
        const newCode = Array(6).fill('_');
        val.split('').forEach((ch, i) => (newCode[i] = ch));
        setCode(newCode);
        setValidationStatus(null);
        setErrorMessage('');
    }, []);

    const handleKeyDown = useCallback((e: { key: string; preventDefault: () => void; }) => {
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
    }, [code]);

    const handleSubmit = useCallback(async () => {
        if (!isComplete) {
            setValidationStatus(false);
            return false;
        }
        const codeStr = code.join('');
        // Здесь реальный запрос на сервер
        if (codeStr === '123456') {
            setValidationStatus(true);
            setErrorMessage('');
            return true;
        } else {
            setValidationStatus(false);
            setErrorMessage('Неверный код');
            return false;
        }
    }, [code, isComplete]);

    const handleRequestCode = useCallback(() => {
        startTimer();
        // Здесь можно запускать запрос на повторную отправку кода
    }, [startTimer]);

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