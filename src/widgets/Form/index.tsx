'use client';

import Button from '@/shared/UI/Button';
import styles from './styles.module.scss';
import {useForm} from '@/shared/hooks/useForm';
import {signIn} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {Dispatch, FC, FormEventHandler, SetStateAction, useEffect, useMemo, useState} from 'react';
import LoginInput from '../../shared/UI/LoginInput';
import Link from 'next/link';
import {config, initialState, LoginFormData, ValidationStatus} from '@/shared/configs/login';
import {
    checkFormValidity,
    computeValidationStatus,
    getDone,
    getIndicator,
} from '@/shared/utils/loginFunctions/loginFunctions';


interface FormProps {
    toggleRegisterMode?: boolean
    activateModalSuccess?: Dispatch<SetStateAction<boolean>>
}

const Form: FC<FormProps> = ({toggleRegisterMode, activateModalSuccess}) => {
    const router = useRouter();
    const {values, handleChange, resetValues} = useForm<LoginFormData>(initialState);
    const [validationStatus, setValidationStatus] = useState<ValidationStatus>({
        login: 0,
        email: 0,
        password: 0,
    });
    const [serverErrors, setServerErrors] = useState<Record<keyof LoginFormData, boolean>>({
        login: false,
        email: false,
        password: false,
    });
    const [isValid, setIsValid] = useState<boolean>(false);
    const activeFields = useMemo<(keyof LoginFormData)[]>(() => {
        return toggleRegisterMode
            ? ['login', 'password', 'email']
            : ['login', 'password'];
    }, [toggleRegisterMode]);

    const configMap = useMemo(() => {
        const map: Record<string, typeof config[number]> = {};
        config.forEach(c => {
            map[c.name] = c;
        });
        return map;
    }, []);

    // Сброс формы и ошибок при изменении toggleRegisterMode
    useEffect(() => {
        resetValues(initialState);
        setServerErrors({
            login: false,
            email: false,
            password: false,
        });
    }, [toggleRegisterMode, resetValues]);

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
            login: false,
            email: false,
            password: false,
        });

        if (!validateForm()) return;
        if (toggleRegisterMode) {
            if (activateModalSuccess) {
                activateModalSuccess(true);
            }
        } else {
            const res = await signIn('credentials', {
                username: values.login,
                password: values.password,
                redirect: false,
            });

            if (res && !res.error) {
                router.push('/');
            } else {
                // ошибки от сервера setServerErrors
                // console.log(res);
            }
        }
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit}
        >
            <LoginInput
                label={'Логин'}
                type={'text'}
                name={'login'}
                onChange={handleChange}
                value={values.login}
                placeholder={'Логин'}
                id={'login'}
                indicator={getIndicator('login', values, validationStatus, serverErrors)}
                done={getDone('login', values, validationStatus, serverErrors, activeFields)}
                error={serverErrors.login}
                warn={!serverErrors.login && validationStatus.login === 2}
                errorMessage={serverErrors.login ? configMap.login?.errorMessage : undefined}
                warnMessage={!serverErrors.login && validationStatus.login === 2 ? configMap.login?.warnMessage : undefined}
                required
            />
            <LoginInput
                label={'Пароль'}
                type={'password'}
                name={'password'}
                onChange={handleChange}
                value={values.password}
                placeholder={'Пароль'}
                id={'password'}
                indicator={getIndicator('password', values, validationStatus, serverErrors)}
                done={getDone('password', values, validationStatus, serverErrors, activeFields)}
                error={serverErrors.password}
                warn={!serverErrors.password && validationStatus.password === 2}
                errorMessage={serverErrors.password ? configMap.password?.errorMessage : undefined}
                warnMessage={!serverErrors.password && validationStatus.password === 2 ? configMap.password?.warnMessage : undefined}
                required
            />
            {toggleRegisterMode && (
                <LoginInput
                    label={'Email'}
                    type={'email'}
                    name={'email'}
                    onChange={handleChange}
                    value={values.email || ''}
                    placeholder={'Email'}
                    id={'email'}
                    indicator={getIndicator('email', values, validationStatus, serverErrors)}
                    done={getDone('email', values, validationStatus, serverErrors, activeFields)}
                    error={serverErrors.email}
                    warn={!serverErrors.email && validationStatus.email === 2}
                    errorMessage={serverErrors.email ? configMap.email?.errorMessage : undefined}
                    warnMessage={!serverErrors.email && validationStatus.email === 2 ? configMap.email?.warnMessage : undefined}
                    required={configMap.email?.required}
                />
            )}
            <div className={`${styles.form_inner} ${toggleRegisterMode ? styles.policy : ''}`}>
                <label className={styles.form_inner_label}>
                    <input
                        type={'checkbox'}
                        name={toggleRegisterMode ? 'policy' : 'remember'}
                        className={styles.form_inner_label__checkbox}
                    />
                    {toggleRegisterMode ? 'Соглашаюсь на' : 'Запомнить'}
                </label>
                <Link
                    href={toggleRegisterMode ? '/policy' : '/recovery'}
                    className={styles.form_inner__forget}
                >
                    {toggleRegisterMode ? 'обработку персональных данных' : 'Забыли пароль?'}
                </Link>
            </div>
            <Button
                width={toggleRegisterMode ? 278 : 171}
                height={55}
                aria-label={toggleRegisterMode ? 'Подтвердить' : 'Войти'}
                text={toggleRegisterMode ? 'Подтвердить' : 'Войти'}
                className={styles.form__button}
                disabled={!isValid}
            />
        </form>
    );
};

export default Form;
