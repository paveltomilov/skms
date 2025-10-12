# Используем базовый образ с Node.js для сборки проекта
FROM node:lts-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости (более строгий подход)
RUN npm ci --only=production

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Используем базовый образ для Nginx (alpine версия легче)
FROM nginx:alpine

# Копируем собранные файлы
COPY --from=build /app/.next /usr/share/nginx/html
COPY --from=build /app/public /usr/share/nginx/html/public

# Копируем конфигурацию nginx
COPY .nginx/nginx.conf /etc/nginx/nginx.conf

# Создаем директорию для логов
RUN mkdir -p /var/log/nginx

# Настраиваем открытие порта 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]