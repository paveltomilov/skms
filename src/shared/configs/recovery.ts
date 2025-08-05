
import {RecoveryFormData} from '@/shared/types/recovery';
import {ValidationLevel} from '@/shared/types/login';
import {InputProps} from '@/shared/types/inputLogin';


type Recovery = (InputProps & {
    validate?: (state: RecoveryFormData) => ValidationLevel;
    name: keyof RecoveryFormData;
})[];

export const configRecovery: Recovery = [
    {
        name: 'email',
        required: true,
        errorMessage: 'Пользователь с таким E-mail не существует',
        warnMessage: 'E-mail введен не корректно',
        validate: (state: RecoveryFormData) => {
            if (!state.email || !state.email.trim()) return 0;
            const emailPattern = /^\S+@\S+\.\S+$/;
            if (!emailPattern.test(state.email)) return 2;
            return 0;
        }
    },
    {
        name: 'password',
        required: true,
        errorMessage: 'Пароль введен неверно',
        warnMessage: 'Пароль не должен содержать в себе символы @, #, ! и также кириллицу',
        validate: (state: RecoveryFormData) => {
            if (!state.password.trim()) return 0;

            const forbiddenSymbolsPattern = /[@#!]/;
            const cyrillicPattern = /[а-яёА-ЯЁ]/;
            if (forbiddenSymbolsPattern.test(state.password) || cyrillicPattern.test(state.password)) return 2;
            return 0;
        }
    },
    {
        name: 'confirm_password',
        required: true,
        errorMessage: 'Пароль не совпадает',
        warnMessage: 'Недостаточное количество символов',
        validate: (state: RecoveryFormData) => {
            if (!state.password.trim()) return 0;
            if(state.password.length !== state.confirm_password.length) return 2;
            return 0;
        }
    },
];

export const initialStateRecovery: RecoveryFormData = {
    email: '',
    password: '',
    confirm_password: '',
};