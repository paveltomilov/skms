export type Role = 'admin' | 'teacher' | 'student' | ''

export interface User {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    role: Role,
};