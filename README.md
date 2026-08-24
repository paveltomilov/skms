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

    ```

2. **Настройка переменных окружения:**

    В корне проекта находится файл .env.example, который содержит шаблон переменных окружения, используемых проектом. Для
    правильной работы платформы в корне проекта создайте файл .env на основе .env.example и настройте его, заполнив нужные значения.

    .env.example:

    ```
    NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
    NEXT_PUBLIC_WS_URL=ws://127.0.0.1:8000/ws/simulation/student
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

Демо: https://skms.pro/
