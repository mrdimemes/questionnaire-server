# Переменные окружения (.env)

## Общие

- PORT = 5000
- CLIENT_URL

## Конфигурация MySQL

- DB_HOST
- DB_USER
- DB_PASSWORD
- DB_NAME = "questionnaire_db"
- DB_CONNECTION_LIMIT

## Хэши

- SALT

## Авторизация

- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- JWT_ACCESS_LIFETIME = 30 (минут)
- JWT_REFRESH_LIFETIME = 30 (дней)

## Опросы

- MAX_QUESTIONNAIRE_CARDS_PER_PAGE = 50
