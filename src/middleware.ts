export { default } from 'next-auth/middleware';

// добавить еще роуты, которые нужно защитить
export const config = { matcher: ['/'] };
