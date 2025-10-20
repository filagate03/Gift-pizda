# Deployment Checklist

## Frontend / API
- ✅ Готовые конфигурации для Vercel и Netlify:
  - Vercel: импортируйте репозиторий, команда `npm run build`, переменные окружения из `.env.example`.
  - Netlify: оставьте команду `npm run build`, `publish = .next` (см. `netlify.toml`), убедитесь что установлен `@netlify/plugin-nextjs`.
- ✅ TON Connect манифест генерируется автоматически (`/api/tonconnect-manifest`). Добавьте `NEXT_PUBLIC_APP_URL`, чтобы ссылка была валидной для продакшена. При необходимости укажите внешний URL через `NEXT_PUBLIC_TONCONNECT_MANIFEST`.
- ✅ Страницы `/legal/terms` и `/legal/privacy` созданы — заполните содержимое перед публичным запуском.

## Database
- Создайте проект в Supabase и примените `lib/schema.sql`.
- Задайте переменную `DATABASE_URL` и настройте RLS (при необходимости) перед подключением клиента.

## Redis / Real-time
- Создайте инстанс Upstash Redis.
- Сохраните `REDIS_URL` и ключ в переменных окружения (готово для дальнейшей интеграции в `lib/server.ts`).

## TON
- Обновите `NEXT_PUBLIC_APP_URL` так, чтобы TON Connect кошельки получали корректный абсолютный URL манифеста.
- Подготовьте рабочий кошелек платформы и настройте холодное хранилище для основного банка.

## Telegram
- В BotFather включите поддержку Web App и добавьте продакшн URL (Vercel/Netlify).
- Настройте команды, домен и права доступа, заполните описание и иконку.

## Monitoring & Analytics
- Подключите Sentry, Logflare или аналог для serverless функций.
- Включите Vercel Analytics / Netlify Analytics для базовых метрик.

## Security & Compliance
- Регулярно обновляйте зависимости (`npm audit`) и проводите аудит смарт-контрактов.
- Добавьте лимиты ставок, KYC-политику (при необходимости) и процессы AML.
- Обновите юридические документы и убедитесь, что ссылки в манифесте указывают на актуальные версии.
