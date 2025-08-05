export type ValidationLevel = 0 | 1 | 2 | 3;  // 0-дефолт, 1-ошибка, 2-предупреждение, 3-ОК
export type ValidationStatus = Record<keyof LoginFormData, ValidationLevel>;

export type LoginFormData = {
    login: string;
    password: string;
    email: string;
}