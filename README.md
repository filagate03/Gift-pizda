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

## Запуск
```bash
npm install
npm run dev
```

Перед запуском укажите `NEXT_PUBLIC_TONCONNECT_MANIFEST` в `.env.local` для корректного отображения TON Connect кнопки.
