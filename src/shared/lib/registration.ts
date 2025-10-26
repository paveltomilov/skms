import {LoginFormData, LoginResponse} from '@/shared/types/login';
import axios from 'axios';
import {doFirstLatterBig} from '@/shared/utils/doFirstLatterBig/doFirstLatterBig';

const urlBase: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;
interface IResponseRegistration {
    email?: string[],
    password?: string[],
    first_name?: string[],
    last_name?: string[],
    detail?: string;
}


export async  function postRegistration(formData: LoginFormData): Promise<{ success: boolean; errors?: IResponseRegistration }> {
    const newUser = {
        email: formData.email,
        password: formData.password,
        first_name: doFirstLatterBig(formData.first_name),
        last_name:  doFirstLatterBig(formData.last_name),
    };
    try {
        const response = await axios.post<LoginResponse>(
            `${urlBase}/users/`, 
            newUser,
            {headers: {'Content-Type': 'application/json'}},
        );
        
        if (response.status == 200 || response.status == 201) {
            return {success: true};
        }
        return {success: false};
    } catch(error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                // Сервер ответил с ошибкой
                return { success: false, errors: error.response.data as IResponseRegistration };
            } else if (error.request) {
                // Запрос был сделан, но ответ не получен
                return {
                    success: false,
                    errors: { detail: 'Нет ответа от сервера' }
                };
            }
        }
        return {
            success: false,
            errors: { detail: 'Произошла неизвестная ошибка' }
        };
    }
}