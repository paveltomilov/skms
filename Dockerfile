# Используем базовый образ с Node.js для сборки проекта
FROM node:lts-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Используем базовый образ для Nginx
FROM nginx:alpine

# Копируем ВСЮ выходную директорию Next.js
COPY --from=build /app/out /usr/share/nginx/html

# Копируем статические файлы
COPY --from=build /app/public /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY .nginx/nginx.conf /etc/nginx/nginx.conf

# Создаем директорию для логов
RUN mkdir -p /var/log/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]