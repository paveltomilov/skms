# Skill Management System

Интерфейс веб-приложения, позволяющее имитировать функционирование автоматизированного рабочего места машиниста 
на программно-техническом комплексе

## Установка и запуск

1. **Клонирование репозитория:**

   Клонируйте репозиторий на свою машину:
  
  ```
 git clone https://gitlab.guild-of-developers.ru/l2/skillsystem/frontend.git
   cd <папка_проекта>
```
     Перейдите на ветку develop:
    
  ` git checkout develop`
   

2. **Настройка переменных окружения:**

   В корне проекта находится файл .env.example, который содержит шаблон переменных окружения, используемых проектом. Для
   правильной работы платформы в корне проекта создайте файл .env на основе .env.example и настройте его, заполнив нужные значения.

3. **Запуск в Docker:** 

   Запустите контейнеры с пересборкой образов:
   ```
   docker-compose up -d --build

**Доступ к приложению**

   После запуска приложение будет доступно по адресу:
   ```
   API: http://127.0.0.1:3000/ (порт возможно изменится)
   ```
   
 **Остановка контейнера**

   Чтобы остановить контейнеры, выполните:
   ```
   docker-compose down
   ```
    
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

[проведение код ревью](https://docs.google.com/document/d/19JU-Y9FXi_RTufERvckXiAwASfAuXN-llD6swcd8xAs/edit?usp=drive_link)

[GIT FLOW](https://docs.google.com/document/d/18o2wA3tGDt80-be8OvAjvuYV_8QyJVkupyv1znXLE3I/edit?usp=drive_link)

[Организация структуры папок и файлов](https://docs.google.com/document/d/1hmFT94A0qgcsDe4OMW-Ce18Ee17tQiJjQ7zaCU1sQW4/edit?usp=drive_link)