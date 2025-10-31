import axios, { AxiosError } from 'axios';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ApiErrors = { detail?: string; [key: string]: unknown };
export type ApiResult<T> =
	| { success: true; data: T }
	| { success: false; errors: ApiErrors };

export interface RequestResetResponse {
	message?: string;
}
export interface VerifyCodeResponse {
	session_token: string;
}
export interface SetNewPasswordResponse {
	message?: string;
}

function toApiErrors(error: unknown): ApiErrors {
	if (axios.isAxiosError(error)) {
		const err = error as AxiosError<unknown>;
		return (err.response?.data as ApiErrors) ?? { detail: 'Ошибка сети' };
	}
	return { detail: 'Ошибка сети' };
}

export async function requestPasswordReset(
	email: string,
): Promise<ApiResult<RequestResetResponse>> {
	try {
		const { data } = await axios.post<RequestResetResponse>(
			`${urlBase}/password/reset/request/`,
			{ email },
			{
				headers: { 'Content-Type': 'application/json' },
			},
		);
		return { success: true, data };
	} catch (error: unknown) {
		return { success: false, errors: toApiErrors(error) };
	}
}

export async function verifyRecoveryCode(
	email: string,
	code: string,
): Promise<ApiResult<VerifyCodeResponse>> {
	try {
		const { data } = await axios.post<VerifyCodeResponse>(
			`${urlBase}/password/reset/verify/`,
			{ email, code },
			{
				headers: { 'Content-Type': 'application/json' },
			},
		);
		return { success: true, data };
	} catch (error: unknown) {
		return { success: false, errors: toApiErrors(error) };
	}
}

export async function setNewPassword(
	sessionToken: string,
	newPassword: string,
	confirmPassword: string,
): Promise<ApiResult<SetNewPasswordResponse>> {
	try {
		const { data } = await axios.post<SetNewPasswordResponse>(
			`${urlBase}/password/reset/complete/`,
			{
				session_token: sessionToken,
				new_password: newPassword,
				confirm_password: confirmPassword,
			},
			{
				headers: { 'Content-Type': 'application/json' },
			},
		);
		return { success: true, data };
	} catch (error: unknown) {
		return { success: false, errors: toApiErrors(error) };
	}
}
