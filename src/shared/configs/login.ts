import {InputProps} from '../UI/LoginInput';

export type ValidationLevel = 0 | 1 | 2 | 3;
export type ValidationStatus = Record<keyof LoginFormData, ValidationLevel>;


type Login = (InputProps & {
    validate?: (state: LoginFormData) => ValidationLevel;
    name: keyof LoginFormData;
})[];

export const config: Login = [
    {
        name: 'login',
        required: true,
        errorMessage: 'Данный логин не зарегистрирован',
        warnMessage: 'Логин должен состоять только из латинских букв и цифр',
        validate: (state: LoginFormData) => {
            if (!state.login.trim()) return 0;
            const cyrillicPattern = /[а-яёА-ЯЁ]/;

            if (cyrillicPattern.test(state.login)) return 2;
            return 0;
        }
    },
    {
        name: 'password',
        required: true,
        errorMessage: 'Пароль введен неверно',
        warnMessage: 'Пароль не должен содержать в себе символы @, #, ! и также кириллицу',
        validate: (state: LoginFormData) => {
            if (!state.password.trim()) return 0;

            const forbiddenSymbolsPattern = /[@#!]/;
            const cyrillicPattern = /[а-яёА-ЯЁ]/;
            if (forbiddenSymbolsPattern.test(state.password) || cyrillicPattern.test(state.password)) return 2;
            return 0;
        }
    },
    {
        name: 'email',
        required: true,
        errorMessage: 'Пользователь с таким E-mail уже существует',
        warnMessage: 'E-mail введен не корректно',
        validate: (state: LoginFormData) => {
            if (!state.email || !state.email.trim()) return 0;
            const emailPattern = /^\S+@\S+\.\S+$/;
            if (!emailPattern.test(state.email)) return 2;
            return 0;
        }
    },
];

export const initialState: LoginFormData = {
    login: '',
    password: '',
    email: '',
};

export type LoginFormData = {
    login: string;
    password: string;
    email: string;
}


