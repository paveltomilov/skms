# Skill Management System

Интерфейс веб-приложения, позволяющее имитировать функционирование автоматизированного рабочего места машиниста
на программно-техническом комплексе

## Установка и запуск

1. **Клонирование репозитория:**

   Клонируйте репозиторий на свою машину:
   ```bash
   Clone with SSH
   git@gitlab.pointpulse.ru:l2/skillsystem/frontend.git

   Clone with HTTPS
   https://gitlab.pointpulse.ru/l2/skillsystem/frontend.git

   cd <папка_проекта>

2. **Настройка переменных окружения:**

   В корне проекта находится файл .env.example, который содержит шаблон переменных окружения, используемых проектом. Для
   правильной работы платформы в корне проекта создайте файл .env на основе .env.example и настройте его, заполнив нужные значения.

   .env.example:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
   ```

3. **Запуск в Docker:**

   docker-compose up --build

4. **Настройка виртуального окружения локально без Docker:**

   Установите зависимости:

   ```bash
   npm install 
   ```
   Запустите сервер:
   ```bash
   npm run dev
   ```

## Для запуска сторибук

   ```bash
   npm run sb 
   ```

## Для запуска тестов

   ```bash
   npm run test 
   ```

## Документация для Frontend разработчиков

[проведение код ревью](https://docs.google.com/document/d/1dF586YFDig0hSYadGtKzDV78uuNV4tnh-5j1SvG6Fog/edit?tab=t.0#heading=h.9mk7dwpwhizl)

[Критерии приемки задач для фронтенд-разработки](https://docs.google.com/document/d/1zL6ofLTsn7FiK4khl8eFYUSUA6IZWTIAFgNNWb-xips/edit?tab=t.0#heading=h.6ro64a3gj5jk)

[Организация структуры папок и файлов](https://docs.google.com/document/d/18o2wA3tGDt80-be8OvAjvuYV_8QyJVkupyv1znXLE3I/edit?tab=t.0)