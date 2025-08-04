'use client';

import styles from './style.module.scss';
import Button from '@/shared/UI/Button';
import {ChangeEvent, FC, FormEvent, useCallback, useEffect, useState} from 'react';
import {useRecoveryCode} from '@/shared/hooks/useRecoveryCode';
import {CodeDisplay} from '@/entities/CodeDisplay';

type FormRecoveryProps = {
    setStep?: (value: 1 | 2 | 3) => void;
    isOpenPopup?: (value: boolean) => void;
}

const FormRecoveryPassword:FC<FormRecoveryProps> = ({setStep, isOpenPopup}) => {
    const {
        code,
        validationStatus,
        errorMessage,
        count,
        inputRef,
        isComplete,
        focusInput,
        handleChange,
        handleKeyDown,
        handleSubmit,
        handleRequestCode,
    } = useRecoveryCode(60);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const onSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        const success = await handleSubmit();
        if (success) {
            setSubmitSuccess(true);
        }
    }, [handleSubmit]);

    useEffect(() => {
        if (submitSuccess) {
            const timer = setTimeout(() => {
                if (isOpenPopup) {
                    isOpenPopup(false);
                }
                if (setStep) {
                    setStep(2);
                }
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [submitSuccess, setStep]);

    return (
        <form className={styles.recoveryPasswordForm} onSubmit={onSubmit} noValidate>
            <input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                name="recovery_code"
                maxLength={6}
                autoComplete="one-time-code"
                className={styles.recoveryPasswordForm__input}
                value={code.join('').replace(/_/g, '')}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                onKeyDown={e => handleKeyDown(e)}
                ref={inputRef}
                aria-label="Код подтверждения из 6 цифр"
            />
            <CodeDisplay code={code} onClick={focusInput} validationStatus={validationStatus} />
            {validationStatus === false && (
                <span className={styles.recoveryPasswordForm__error} data-error={validationStatus}>
                    {errorMessage}
                </span>
            )}
            {count !== 0 ? (
                <span className={styles.recoveryPasswordForm__text}>
                    Отправить код повторно через {count} сек.
                </span>
            ) : (
                <button type="button" className={styles.recoveryPasswordForm__recend} onClick={handleRequestCode}>
                    Отправить код повторно
                </button>
            )}
            <Button
                width={270}
                height={55}
                text="Продолжить"
                ariaLabel="Продолжить"
                className={styles.recoveryPasswordForm__button}
                disabled={!isComplete}
                success={validationStatus === true}
            />
        </form>
    );
};

export default FormRecoveryPassword;
