'use client';

import styles from './style.module.scss';
import {FC, FormEventHandler, useEffect, useMemo, useState} from 'react';
import LoginInput from '@/shared/UI/LoginInput';
import Button from '@/shared/UI/Button';
import {useForm} from '@/shared/hooks/useForm';
import {
    configRecovery,
    initialStateRecovery,
    RecoveryFormData,
    ValidationStatusRecovery
} from '@/shared/configs/recovery';
import {
    checkFormValidity,
    computeValidationStatus,
    getDone,
    getIndicator
} from '@/shared/utils/recoveryFunctions/recoveryFunctions';
import {useAppDispatch} from '@/shared/hooks/store';
import {openModal} from '@/store/modalSlice';

type FormRecoveryProps = {
    steps?: number,
    setSteps?: (value: 1 | 2 | 3) => void,
}

const FormRecovery: FC<FormRecoveryProps> = ({steps, setSteps}) => {
    const dispatch = useAppDispatch();
    const handleOpenPopupRecoveryPassword = () => {
        if (steps === 1) {
            dispatch(openModal('recoveryPassword'));
        }
    };
    const {values, handleChange, resetValues} = useForm<RecoveryFormData>(initialStateRecovery);
    const [validationStatus, setValidationStatus] = useState<ValidationStatusRecovery>({
        email: 0,
        password: 0,
        confirm_password: 0,
    });
    const [serverErrors, setServerErrors] = useState<Record<keyof RecoveryFormData, boolean>>({
        email: false,
        password: false,
        confirm_password: false,
    });
    const [isValid, setIsValid] = useState<boolean>(false);
    const activeFields = useMemo<(keyof RecoveryFormData)[]>(() => {
        return steps === 2
            ? ['password', 'confirm_password']
            : ['email'];
    }, [steps]);
    const configMap = useMemo(() => {
        const map: Record<string, typeof configRecovery[number]> = {};
        configRecovery.forEach(c => {
            map[c.name] = c;
        });
        return map;
    }, []);

    // Сброс формы и ошибок при изменении toggleRegisterMode
    useEffect(() => {
        resetValues(initialStateRecovery);
        setServerErrors({
            email: false,
            password: false,
            confirm_password: false,
        });
    }, [steps, resetValues]);

    // Обновляем validationStatus при изменении values
    useEffect(() => {
        const newValidationStatus = computeValidationStatus(values);
        setValidationStatus(newValidationStatus);
        setIsValid(checkFormValidity(values, newValidationStatus, serverErrors, activeFields));
    }, [values, serverErrors, activeFields]);

    const validateForm = (): boolean => {
        const newValidationStatus = computeValidationStatus(values);
        setValidationStatus(newValidationStatus);

        const hasLocalErrors: boolean = Object.values(newValidationStatus).some(level => level === 1);
        const hasServerErrors: boolean = Object.values(serverErrors).some(Boolean);
        return !hasLocalErrors && !hasServerErrors;
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        setServerErrors({
            email: false,
            password: false,
            confirm_password: false,
        });

        if (!validateForm()) return;
        if (steps === 2) {
            if (setSteps) {
                setSteps(3);
            }
            // const res = await signIn('credentials', {
            //     username: values.login,
            //     password: values.password,
            //     redirect: false,
            // });
            //
            // if (res && !res.error) {
            //     router.push('/login');
            // } else {
            //     // ошибки от сервера setServerErrors
            //     console.log(res);
            // }
        }
    };

    return(
        <form
            onSubmit={handleSubmit}
            className={styles.recoveryForm}
        >
            {steps === 1 && (
                <LoginInput
                    label={'E-mail'}
                    type={'text'}
                    name={'email'}
                    placeholder={'E-mail'}
                    id={'email'}
                    onChange={handleChange}
                    indicator={getIndicator('email', values, validationStatus, serverErrors)}
                    done={getDone('email', values, validationStatus, serverErrors, activeFields)}
                    error={serverErrors.email}
                    warn={!serverErrors.email && validationStatus.email === 2}
                    errorMessage={serverErrors.email ? configMap.email?.errorMessage : undefined}
                    warnMessage={!serverErrors.email && validationStatus.email === 2 ? configMap.email?.warnMessage : undefined}
                    required
                />
            )}
            {steps === 2 && (
                <>
                    <LoginInput
                        label={'Пароль'}
                        type={'password'}
                        name={'password'}
                        placeholder={'Пароль'}
                        id={'password'}
                        onChange={handleChange}
                        indicator={getIndicator('password', values, validationStatus, serverErrors)}
                        done={getDone('password', values, validationStatus, serverErrors, activeFields)}
                        error={serverErrors.password}
                        warn={!serverErrors.password && validationStatus.password === 2}
                        errorMessage={serverErrors.password ? configMap.password?.errorMessage : undefined}
                        warnMessage={!serverErrors.password && validationStatus.password === 2 ? configMap.password?.warnMessage : undefined}
                        required
                    />
                    <LoginInput
                        label={'Пароль'}
                        type={'password'}
                        name={'confirm_password'}
                        placeholder={'Пароль'}
                        id={'confirm_password'}
                        onChange={handleChange}
                        indicator={getIndicator('confirm_password', values, validationStatus, serverErrors)}
                        done={getDone('confirm_password', values, validationStatus, serverErrors, activeFields)}
                        error={serverErrors.confirm_password}
                        warn={!serverErrors.confirm_password && validationStatus.confirm_password === 2}
                        errorMessage={serverErrors.confirm_password ? configMap.confirm_password?.errorMessage : undefined}
                        warnMessage={!serverErrors.confirm_password && validationStatus.confirm_password === 2 ? configMap.confirm_password?.warnMessage : undefined}
                        required
                    />
                </>
            )}
            <Button
                width={steps === 1 ? 240 : 278}
                height={55}
                text={steps === 1 ? 'Отправить' : 'Подтвердить'}
                ariaLabel={steps === 1 ? 'Отправить' : 'Подтвердить'}
                onClick={handleOpenPopupRecoveryPassword}
                disabled={!isValid}
                className={styles.recoveryForm__button}
            />
        </form>
    );
};

export default FormRecovery;