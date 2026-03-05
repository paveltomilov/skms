# Отчёт: Проверка установки refresh токена в HttpOnly cookie

## 1. Точка входа (контроллер/эндпоинт)

**Файл:** `users/views.py`  
**Класс:** `AuthViewSet` (строки 163-221)  
**Метод:** `create()` (строки 172-221)  
**URL:** `POST /api/auth/` (через DRF router)

**Маршрутизация:**
- `config/urls.py:22` → `path('api/', include('users.urls'))`
- `users/urls.py:17` → `router.register(r'auth', AuthViewSet)`
- DRF создаёт endpoint: `POST /api/auth/` → `AuthViewSet.create()`

---

## 2. Установка cookie refresh

**Файл:** `users/views.py`  
**Строки:** 208-217

```python
if remember:
    response.set_cookie(
        key=settings.REFRESH_COOKIE_NAME,
        value=str(refresh),
        max_age=int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()),
        path=settings.REFRESH_COOKIE_PATH,
        secure=settings.REFRESH_COOKIE_SECURE,
        httponly=settings.REFRESH_COOKIE_HTTPONLY,
        samesite=settings.REFRESH_COOKIE_SAMESITE,
    )
```

**Параметры cookie (из `config/settings.py:143-148`):**

| Параметр | Значение | Файл:Строка |
|----------|----------|-------------|
| **key** | `"refresh_token"` | `settings.py:144` |
| **value** | `str(refresh)` (JWT refresh токен) | `views.py:211` |
| **max_age** | `2592000` секунд (30 дней) | `settings.py:140` → `views.py:212` |
| **path** | `"/api/auth/refresh/"` | `settings.py:145` |
| **secure** | `False` | `settings.py:146` |
| **httponly** | `True` ✅ | `settings.py:148` |
| **samesite** | `"Lax"` | `settings.py:147` |
| **domain** | **НЕ УКАЗАН** ⚠️ | - |

---

## 3. Условие для установки cookie

**Файл:** `users/views.py`  
**Строки:** 191, 208

**Текущая реализация:**
```python
remember = serializer.validated_data['remember']  # Строка 191
# ...
if remember:  # Строка 208
    response.set_cookie(...)  # Cookie устанавливается
else:
    response.data['refresh'] = str(refresh)  # Refresh в JSON body (СТАРАЯ ЛОГИКА)
```

**Планируемая логика (будущее):**
```python
remember = serializer.validated_data['remember']
# ...
if remember:
    response.set_cookie(...)  # Cookie устанавливается
# else: НЕ передаём refresh токен вообще
```

**Сериализатор:** `users/serializers.py:135-138`
```python
class AuthSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    remember = serializers.BooleanField(default=False)  # По умолчанию False
```

**Вывод:** 
- ✅ Cookie устанавливается **только если `remember=True`** в запросе
- ⚠️ **Планируется:** При `remember=False` refresh токен **НЕ будет передаваться** вообще (ни в cookie, ни в body)
- ⚠️ **Последствие:** При `remember=False` пользователь будет разлогиниваться после истечения access токена (15 минут)

---

## 4. Проверка: cookie в response (Set-Cookie)

**Реализация корректна.** При `remember=True`:

1. **Строка 206:** Создаётся `Response` объект
2. **Строка 208:** Проверяется условие `if remember:`
3. **Строка 209:** Вызывается `response.set_cookie()` с параметрами
4. **Строка 221:** Возвращается response с установленной cookie

**Ожидаемый заголовок в response:**
```
Set-Cookie: refresh_token=<jwt_token>; Path=/api/auth/refresh/; Max-Age=2592000; HttpOnly; SameSite=Lax
```

**Примечание:** `domain` не указан, поэтому cookie будет установлена для текущего домена (127.0.0.1:8000).

---

## 5. Чтение cookie при запросе /auth/refresh/

**Файл:** `users/views.py`  
**Метод:** `refresh_token()` (строки 231-266)  
**URL:** `POST /api/auth/refresh/` (через `@action`)

**Строки 233-236:**
```python
refresh_token = (
    request.data.get('refresh')  # Сначала проверяем body
    or request.COOKIES.get(settings.REFRESH_COOKIE_NAME)  # Затем cookie
)
```

**Логика:**
1. Сначала пытается получить refresh из `request.data` (JSON body)
2. Если нет в body, берёт из `request.COOKIES.get('refresh_token')`
3. Если оба пустые → ошибка 400

**Вывод:** ✅ Cookie **читается** из `request.COOKIES` при запросе на `/api/auth/refresh/`.

---

## 6. Возможные проблемы и причины

### ✅ Что работает правильно:

1. ✅ `httponly=True` — cookie недоступна для JavaScript
2. ✅ Условие `remember=True` проверяется корректно
3. ✅ Cookie читается в `refresh_token()` из `request.COOKIES`
4. ✅ `path="/api/auth/refresh/"` — cookie отправляется только на этот путь

### ⚠️ Потенциальные проблемы:

#### 6.1. Отсутствует `domain`

**Проблема:** В `response.set_cookie()` не указан параметр `domain`.

**Последствия:**
- Cookie устанавливается для текущего домена (127.0.0.1:8000)
- Если фронтенд на другом домене/порту (127.0.0.1:3000), cookie **НЕ будет отправлена** браузером

**Решение:**
```python
response.set_cookie(
    # ... существующие параметры ...
    domain=None,  # Явно указать None или не указывать (текущий домен)
    # ИЛИ для cross-domain:
    # domain='.127.0.0.1',  # Но это не сработает для localhost
)
```

**Важно:** Для localhost/127.0.0.1 с разными портами cookie **не будет работать** без специальной настройки.

#### 6.2. `secure=False` (для production)

**Текущее значение:** `REFRESH_COOKIE_SECURE = False`

**Проблема:** В production с HTTPS нужно `secure=True`.

**Решение:** Установить через переменную окружения:
```python
REFRESH_COOKIE_SECURE = os.getenv('REFRESH_COOKIE_SECURE', 'False').lower() == 'true'
```

#### 6.3. CORS и `withCredentials`

**Проверка CORS настроек:** `config/settings.py:175-201`

✅ `CORS_ALLOW_CREDENTIALS = True` — правильно  
✅ `CORS_ALLOWED_ORIGINS` указаны — правильно

**Важно:** Фронтенд **обязательно** должен отправлять запросы с `withCredentials: true`:
```typescript
axios.post('/api/auth/', data, { withCredentials: true })
```

**Если `withCredentials` отсутствует:**
- Cookie не будет отправлена браузером
- Backend не получит cookie в `request.COOKIES`

#### 6.4. `samesite="Lax"`

**Текущее значение:** `REFRESH_COOKIE_SAMESITE = "Lax"`

**Поведение:**
- ✅ Cookie отправляется при top-level navigation
- ✅ Cookie отправляется при GET запросах
- ⚠️ Cookie **НЕ отправляется** при cross-site POST запросах (но это нормально для API)

**Для API это приемлемо**, так как запросы идут с того же origin (через прокси) или с явным `withCredentials`.

#### 6.5. Path ограничение

**Текущее значение:** `REFRESH_COOKIE_PATH = "/api/auth/refresh/"`

**Проблема:** Cookie будет отправляться **только** на пути, начинающиеся с `/api/auth/refresh/`.

**Проверка:**
- ✅ Запрос на `/api/auth/refresh/` → cookie отправляется
- ❌ Запрос на `/api/auth/` → cookie **НЕ отправляется** (если path строгий)

**Решение:** Если нужно, чтобы cookie отправлялась на все `/api/auth/*` пути:
```python
REFRESH_COOKIE_PATH = "/api/auth/"  # Без конкретного endpoint
```

---

## 7. Рекомендации

### Для разработки (localhost):

1. ✅ Оставить `secure=False`
2. ✅ Оставить `samesite="Lax"`
3. ⚠️ Убедиться, что фронтенд использует `withCredentials: true`
4. ⚠️ Проверить, что cookie path подходит для всех нужных endpoints

### Для production:

1. ⚠️ Установить `REFRESH_COOKIE_SECURE = True` (для HTTPS)
2. ✅ Оставить `httponly=True`
3. ✅ Рассмотреть `samesite="Strict"` для большей безопасности
4. ⚠️ Указать явный `domain` если нужен cross-subdomain доступ

---

## 8. Тестирование

### Как проверить, что cookie устанавливается:

1. **Отправить запрос с `remember=true`:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","remember":true}' \
  -v
```

2. **Проверить заголовок `Set-Cookie` в response:**
```
< Set-Cookie: refresh_token=eyJ0eXAiOiJKV1QiLCJhbGc...; Path=/api/auth/refresh/; Max-Age=2592000; HttpOnly; SameSite=Lax
```

3. **Проверить чтение cookie:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/refresh/ \
  -H "Cookie: refresh_token=eyJ0eXAiOiJKV1QiLCJhbGc..." \
  -v
```

---

## Итоговый вердикт

✅ **Реализация корректна** для базового случая:
- Cookie устанавливается при `remember=True`
- Cookie имеет `HttpOnly=True`
- Cookie читается в `refresh_token()`

⚠️ **Требует изменений:**
- **Текущая реализация:** При `remember=False` refresh токен передаётся в JSON body (строка 219)
- **Планируется:** При `remember=False` refresh токен **НЕ передавать** вообще
- **Последствие:** При `remember=False` пользователь будет разлогиниваться после истечения access токена (15 минут)

⚠️ **Требует внимания:**
- Отсутствие `domain` может быть проблемой для cross-port запросов
- Фронтенд должен использовать `withCredentials: true`
- В production нужно `secure=True`

**Основная проблема:** Если фронтенд на `127.0.0.1:3000`, а backend на `127.0.0.1:8000`, cookie **не будет работать** из-за разных портов (даже если domain не указан). Нужен прокси или настройка domain.

---

## 9. Рекомендации по изменению логики

### Изменение в `users/views.py:218-219`

**Текущий код (строка 218-219):**
```python
if remember:
    response.set_cookie(...)
else:
    response.data['refresh'] = str(refresh)  # ← Убрать эту строку
```

**Рекомендуемый код:**
```python
if remember:
    response.set_cookie(
        key=settings.REFRESH_COOKIE_NAME,
        value=str(refresh),
        max_age=int(settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds()),
        path=settings.REFRESH_COOKIE_PATH,
        secure=settings.REFRESH_COOKIE_SECURE,
        httponly=settings.REFRESH_COOKIE_HTTPONLY,
        samesite=settings.REFRESH_COOKIE_SAMESITE,
    )
# При remember=False refresh токен не передаётся - пользователь разлогинится через 15 минут
# (истечение ACCESS_TOKEN_LIFETIME)
```

**Что изменится:**
- ❌ Убрать строку `response.data['refresh'] = str(refresh)` при `remember=False`
- ✅ При `remember=True` → refresh токен в HttpOnly cookie (без изменений)
- ✅ При `remember=False` → refresh токен не передаётся вообще

**Последствия:**
- При `remember=False` пользователь будет разлогиниваться после истечения access токена (15 минут)
- Это повышает безопасность - сессия не сохраняется без явного согласия пользователя
- Фронтенд должен обрабатывать отсутствие refresh токена корректно

**Последствия для фронтенда:**
- При `remember=False` не нужно ожидать refresh токен в ответе
- При `remember=False` не нужно пытаться обновлять токен - пользователь должен залогиниться заново после истечения access токена
- Interceptor должен проверять наличие refresh токена перед попыткой обновления
- При отсутствии refresh токена → редирект на страницу логина
