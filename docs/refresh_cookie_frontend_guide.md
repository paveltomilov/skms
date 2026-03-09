# Руководство для фронтенда: Работа с refresh токеном в HttpOnly cookie

## 🎯 Краткая суть

Когда пользователь логинится с галочкой "Запомнить меня" (`remember=true`), backend устанавливает refresh токен в **HttpOnly cookie**. Это значит:
- ✅ Токен **недоступен** для JavaScript (защита от XSS)
- ✅ Токен **автоматически** отправляется браузером при запросах
- ✅ Токен **нельзя** прочитать через `document.cookie` или библиотеки типа `cookies-next`

**Важно:** Если галочка "Запомнить меня" **НЕ стоит** (`remember=false`), refresh токен **НЕ передаётся** вообще. Пользователь будет разлогиниваться после истечения access токена (15 минут).

---

## 📍 Как это работает на backend

### 1. Логин (`POST /api/auth/`)

**Что происходит:**
- Если `remember=true` → refresh токен приходит в **HttpOnly cookie**
- Если `remember=false` → refresh токен **НЕ передаётся** вообще (ни в cookie, ни в body)

**Параметры cookie:**
- Имя: `refresh_token`
- Путь: `/api/auth/refresh/` (отправляется только на этот endpoint)
- HttpOnly: `true` (недоступна для JS)
- SameSite: `Lax`
- Срок жизни: 30 дней

### 2. Обновление токена (`POST /api/auth/refresh/`)

**Что происходит:**
- Backend сначала проверяет refresh токен в **JSON body** запроса
- Если нет в body, берёт из **cookie** (`request.COOKIES`)
- Возвращает новый access токен

---

## ⚠️ Что нужно сделать на фронтенде

### 1. Обязательно: `withCredentials: true`

**Проблема:** Без этого cookie не будет отправляться браузером!

**Решение:**
```typescript
// В axios конфигурации
axios.defaults.withCredentials = true;

// Или для каждого запроса
axios.post('/api/auth/', data, { withCredentials: true });
```

**Почему важно:**
- Без `withCredentials` браузер **не отправляет** cookie при cross-origin запросах
- Backend не получит cookie в `request.COOKIES`
- Refresh токен не будет работать

### 2. Передавать `remember` в запросе логина

**Проблема:** Если не передать `remember`, backend всегда вернёт refresh в JSON body.

**Решение:**
```typescript
// В форме логина
const [rememberMe, setRememberMe] = useState(false);

// При отправке запроса
const response = await axios.post('/api/auth/', {
    email: formData.email,
    password: formData.password,
    remember: rememberMe,  // ← Важно передать!
}, {
    withCredentials: true,  // ← Обязательно!
});
```

### 3. Правильная обработка ответа логина

**Важно:** При `remember=false` refresh токена **НЕТ** в ответе вообще!



**пример использования:**
```typescript
const { access, first_name, last_name, role } = response.data;
// Примечание: refresh НЕ приходит в ответе при remember=false

// Access токен всегда в ответе
localStorage.setItem('accessToken', access);

// Refresh токен:
if (rememberMe) {
    // При remember=true refresh уже в HttpOnly cookie от backend
    // НЕ нужно сохранять вручную - браузер сам управляет cookie
} else {
    // При remember=false refresh токен НЕ передаётся
    // Пользователь будет разлогиниваться через 15 минут (истечение access токена)
    // НЕ нужно сохранять refresh токен
}
```

### 4. Обновление токена (interceptor)

**Важно:** При `remember=false` refresh токена **НЕТ**, поэтому обновление невозможно!

**Правильно:**
```typescript
// В interceptor для 401 ошибок
try {
    // При remember=true: refresh токен в HttpOnly cookie (недоступен для JS)
    // При remember=false: refresh токена нет вообще
    // 
    // Решение: всегда пытаемся обновить токен через запрос БЕЗ body
    // Backend сам проверит cookie и вернёт новый access токен, если refresh есть
    // Если refresh токена нет (remember=false) - backend вернёт ошибку
    
    const refreshRes = await axios.post('/api/auth/refresh/', 
        {},  // Пустой body - backend возьмёт refresh из HttpOnly cookie (если remember=true)
        {
            withCredentials: true,  // ← Обязательно для cookie!
        }
    );
    
    const newAccessToken = refreshRes.data.access;
    localStorage.setItem('accessToken', newAccessToken);
    
    // Повторяем оригинальный запрос
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return axios(originalRequest);
    
} catch (refreshError) {
    // Если refresh токена нет (remember=false) или он истёк - backend вернёт ошибку
    // Очищаем всё и редиректим на логин
    logout();
    window.location.href = '/login';
    return Promise.reject(refreshError);
}
```

**Почему пустой body:**
- При `remember=true`: refresh токен в HttpOnly cookie → backend читает из `request.COOKIES`
- При `remember=false`: refresh токена нет → backend вернёт 400/401 ошибку → catch блок → редирект на логин
- Не нужно проверять localStorage - там refresh токена никогда не будет в новой логике

---

## 🔍 Частые проблемы и решения

### Проблема 1: Cookie не устанавливается

**Симптомы:**
- В DevTools → Application → Cookies нет `refresh_token`
- При запросе `/api/auth/refresh/` получаем 400 "Отсутствует refresh токен"

**Причины:**
1. ❌ Нет `withCredentials: true` в запросе логина
2. ❌ Разные порты (3000 vs 8000) без прокси
3. ❌ CORS не настроен правильно

**Решение:**
```typescript
// 1. Добавить withCredentials
axios.post('/api/auth/', data, { withCredentials: true });

// 2. Проверить CORS на backend (должен быть настроен)
// 3. Использовать прокси или один порт для dev
```

### Проблема 2: Cookie не отправляется при refresh

**Симптомы:**
- Cookie есть в браузере, но backend не получает её
- 400 ошибка "Отсутствует refresh токен"

**Причины:**
1. ❌ Нет `withCredentials: true` в запросе refresh
2. ❌ Неправильный path cookie (должен быть `/api/auth/refresh/`)

**Решение:**
```typescript
// Всегда добавлять withCredentials
axios.post('/api/auth/refresh/', body, { withCredentials: true });
```

### Проблема 3: Не могу прочитать refresh токен из cookie

**Симптомы:**
- `getCookie('refresh_token')` возвращает `undefined`
- `document.cookie` не содержит `refresh_token`

**Причина:**
- ✅ Это **нормально**! HttpOnly cookie **недоступна** для JavaScript

**Решение:**
- Не пытаться читать HttpOnly cookie
- Отправлять запрос на refresh **без body**, если токен в cookie
- Backend сам возьмёт токен из cookie

### Проблема 4: Разные порты (3000 и 8000)

**Симптомы:**
- Cookie не устанавливается или не отправляется
- CORS ошибки

**Причина:**
- Браузер считает `127.0.0.1:3000` и `127.0.0.1:8000` разными доменами
- Cookie не работает между разными портами

**Решения:**

**Вариант A: Прокси (рекомендуется)**
```javascript
// next.config.js или vite.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*',
      },
    ];
  },
};
```

**Вариант B: Один порт**
- Запускать фронт и бэк на одном порту через reverse proxy

**Вариант C: Для dev - использовать один origin**
- Если возможно, запускать всё на одном порту

---

## 📝 Чеклист для фронтенда

### При логине:
- [ ] Передавать `remember` в body запроса
- [ ] Использовать `withCredentials: true`
- [ ] Сохранять access токен в localStorage
- [ ] Если `remember=false` → **НЕ ожидать** refresh токен в ответе
- [ ] Если `remember=true` → НЕ сохранять refresh (он уже в HttpOnly cookie)

### При обновлении токена (interceptor):
- [ ] Отправлять запрос на refresh БЕЗ body (пустой объект `{}`)
- [ ] Использовать `withCredentials: true` (для HttpOnly cookie)
- [ ] Backend сам проверит cookie и вернёт новый access токен
- [ ] Если refresh токена нет (remember=false) → backend вернёт ошибку → редирект на логин
- [ ] Обрабатывать ошибки refresh (редирект на логин)

### При logout:
- [ ] Вызывать `POST /api/auth/logout/` для удаления HttpOnly cookie
- [ ] Очищать localStorage
- [ ] Очищать обычные cookie (если были)

### Общие требования:
- [ ] Все axios запросы с `withCredentials: true`
- [ ] Проверить CORS настройки на backend
- [ ] Использовать прокси для dev (если разные порты)

---

## 🧪 Как проверить, что всё работает

### 1. Проверить установку cookie

**В браузере:**
1. Открыть DevTools → Application → Cookies
2. Залогиниться с `remember=true`
3. Проверить, что появилась cookie `refresh_token` с флагом HttpOnly

**В Network:**
1. Открыть DevTools → Network
2. Найти запрос `POST /api/auth/`
3. Проверить Response Headers → должен быть `Set-Cookie: refresh_token=...`

### 2. Проверить отправку cookie

**В Network:**
1. Найти запрос `POST /api/auth/refresh/`
2. Проверить Request Headers → должен быть `Cookie: refresh_token=...`
3. Если нет → проверить `withCredentials: true`

### 3. Проверить работу interceptor

1. Дождаться истечения access токена (15 минут)
2. Сделать любой запрос к API
3. Проверить, что interceptor автоматически обновил токен
4. Проверить, что оригинальный запрос выполнился успешно

---

## 💡 Пример полной реализации

```typescript
// api/auth.ts
export async function login(email: string, password: string, remember: boolean) {
    const response = await axios.post('/api/auth/', {
        email,
        password,
        remember,  // ← Передаём remember
    }, {
        withCredentials: true,  // ← Обязательно!
    });
    
    const { access, first_name, last_name, role } = response.data;
    // Примечание: refresh НЕ приходит в ответе при remember=false
    
    // Сохраняем access токен
    localStorage.setItem('accessToken', access);
    
    // Refresh токен:
    // - При remember=true → в HttpOnly cookie (браузер управляет автоматически)
    // - При remember=false → НЕ передаётся вообще (пользователь разлогинится через 15 минут)
    
    return { access, first_name, last_name, role };
}

// api/interceptor.ts
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                // Пытаемся обновить токен
                // При remember=true: refresh в HttpOnly cookie → backend возьмёт из cookie
                // При remember=false: refresh токена нет → backend вернёт ошибку
                const refreshRes = await axios.post('/api/auth/refresh/', 
                    {},  // Пустой body - backend проверит cookie
                    {
                        withCredentials: true,  // ← Обязательно для cookie!
                    }
                );
                
                const newAccessToken = refreshRes.data.access;
                localStorage.setItem('accessToken', newAccessToken);
                
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
                
            } catch (refreshError) {
                // Refresh токена нет (remember=false) или он истёк
                // Очищаем всё и редиректим на логин
                logout();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

// api/logout.ts
export async function logout() {
    try {
        // Вызываем backend для удаления HttpOnly cookie
        await axios.post('/api/auth/logout/', {}, {
            withCredentials: true,
        });
    } catch (err) {
        console.error('Ошибка при logout:', err);
    } finally {
        // Очищаем локальные данные
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // ... очистка других данных
    }
}
```

---

## 🎯 Итоговые правила

1. **Всегда** используй `withCredentials: true` для запросов к API
2. **Передавай** `remember` в запросе логина
3. **Не пытайся** читать HttpOnly cookie через JavaScript
4. **При `remember=false`** refresh токен НЕ передаётся - пользователь разлогинится через 15 минут
5. **При refresh** проверяй наличие refresh токена перед попыткой обновления
6. **При logout** вызывай backend endpoint для удаления cookie
7. **Используй прокси** для dev, если фронт и бэк на разных портах

---

## ❓ FAQ

**Q: Почему я не вижу refresh токен в cookie через JavaScript?**  
A: Это нормально! HttpOnly cookie специально недоступна для JS (защита от XSS).

**Q: Как узнать, где хранится refresh токен (cookie или localStorage)?**  
A: Если `remember=true` при логине → в HttpOnly cookie (недоступна для JS). Если `remember=false` → refresh токен **НЕ передаётся** вообще. В localStorage refresh токена **никогда не будет** в новой логике.

**Q: Нужно ли отправлять refresh токен в body при refresh запросе?**  
A: Нет! Отправляй **пустой body** (`{}`). Backend сам проверит HttpOnly cookie. Если refresh токена нет (remember=false) → backend вернёт ошибку → редирект на логин.

**Q: Что происходит при `remember=false` после истечения access токена?**  
A: Пользователь автоматически разлогинивается и должен залогиниться заново. Refresh токен не передаётся, поэтому обновление невозможно - backend вернёт ошибку при попытке refresh.

**Q: Зачем проверять localStorage для refresh токена?**  
A: Не нужно! В новой логике refresh токена в localStorage **никогда не будет**. При `remember=true` он в HttpOnly cookie (недоступна для JS), при `remember=false` его нет вообще. Просто отправляй запрос на refresh с пустым body - backend сам разберётся.

**Q: Почему cookie не работает между портами 3000 и 8000?**  
A: Браузер считает их разными доменами. Используй прокси или один порт.

**Q: Что делать, если backend не получает cookie?**  
A: Проверь: 1) `withCredentials: true`, 2) CORS настройки, 3) SameSite параметры.
