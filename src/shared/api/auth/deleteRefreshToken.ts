import axios from 'axios';

const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL;

export const deleteRefreshToken = () => {
    try {
        axios.post(`${urlBase}/auth/logout/`, {}, {withCredentials: true});
    } catch (err) {
        console.error('Ошибка при logout:', err);
    }
};