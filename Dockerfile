# Используем базовый образ с Node.js для сборки проекта
FROM node:lts AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install 

# Копируем остальные файлы проекта в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Используем базовый образ для Nginx
FROM nginx:latest

# Копируем собранные файлы в директорию, откуда nginx будет раздавать статические файлы
COPY --from=build /app/.next /usr/share/nginx/html

# Копируем пользовательский конфигурационный файл nginx
COPY .nginx/nginx.conf /etc/nginx/nginx.conf

# Настраиваем открытие порта 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]
