export type ValidationLevel = 0 | 1 | 2 | 3; // 0-дефолт, 1-ошибка, 2-предупреждение, 3-ОК
export type ValidationStatus = Record<keyof LoginFormData, ValidationLevel>;

export type LoginFormData = {
	email: string;
	password: string;
};

export interface LoginResponse {
	access?: string;
	refresh?: string;
	first_name: string;
	last_name: string;
	role: string; // "admin" или "student"
}
