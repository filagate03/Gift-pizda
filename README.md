# Gift TON Mini App

Этот проект представляет собой MVP Telegram Mini App на TON блокчейне с фокусом на прозрачности и Provably Fair механиках. Репозиторий содержит фронтенд на Next.js (App Router) и серверные API-роуты для имитации ключевых сценариев платформы: кейсы, crash-игра, PvP battles, инвентарь и реферальная система.

## Технологии
- Next.js 14 + React 18
- Tailwind CSS и Framer Motion для UI/анимаций
- Telegram Web App SDK (@twa-dev/sdk)
- TON Connect UI React
- Serverless API маршруты (app/api)

## Структура
- `app/` — страницы и серверные маршруты
- `components/` — UI-компоненты
- `hooks/` — кастомные хуки
- `lib/` — утилиты и мок-данные
- `styles/` — глобальные стили Tailwind

## Быстрый старт
1. Скопируйте пример переменных окружения и при необходимости обновите значения:
   ```bash
   cp .env.example .env.local
   ```
2. Установите зависимости и запустите dev-сервер:
   ```bash
   npm install
   npm run dev
   ```

> В `.env.local` укажите `NEXT_PUBLIC_APP_URL` (например, `https://gift-ton.vercel.app`). Манифест TON Connect по умолчанию доступен по адресу `/api/tonconnect-manifest`, поэтому дополнительная конфигурация не требуется. Если вы размещаете манифест отдельно, задайте `NEXT_PUBLIC_TONCONNECT_MANIFEST`.

## Проверьте перед продакшеном
- `npm run lint` — статический анализ кода
- `npm run build` — production-сборка приложения

## Деплой на Vercel
1. Создайте новый проект и импортируйте репозиторий.
2. В разделе **Environment Variables** добавьте значения из `.env.example` (минимум `NEXT_PUBLIC_APP_URL`).
3. Запустите деплой. Vercel автоматически соберёт Next.js приложение и задеплоит API-роуты как serverless функции.

## Деплой на Netlify
1. Подключите репозиторий в Netlify и укажите команду сборки `npm run build`.
2. В переменных окружения Netlify задайте:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_TONCONNECT_MANIFEST` (необязательно, если используете встроенный манифест)
3. Убедитесь, что в проект добавлен `@netlify/plugin-nextjs` (см. `package.json`) и присутствует `netlify.toml` — Netlify настроит SSR автоматически.

## Что дальше?
- Подключите реальные источники данных вместо моков (`lib/server.ts`).
- Реализуйте смарт-контракты на FunC и хранение результатов в PostgreSQL/Redis.
- Заполните страницы `legal/` фактическими юридическими документами.
