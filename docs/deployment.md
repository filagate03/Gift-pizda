# Deployment Checklist

1. **Frontend / API**
   - Deploy the Next.js application to Vercel.
   - Configure environment variables on Vercel:
     - `NEXT_PUBLIC_TONCONNECT_MANIFEST`
     - `TELEGRAM_BOT_TOKEN` (если используется серверная авторизация)
     - `DATABASE_URL` (Supabase PostgreSQL)
     - `REDIS_URL` (Upstash)

2. **Database**
   - Создайте проект в Supabase и примените `lib/schema.sql` через SQL Editor.
   - Настройте политики Row Level Security по необходимости.

3. **Redis / Real-time**
   - Создайте Upstash Redis инстанс.
   - Сохраните URL и токен в переменных окружения.

4. **TON**
   - Хостинг файла манифеста TON Connect (например, в Vercel /public/manifest.json).
   - Настройте кошелек платформы и холодное хранилище.

5. **Telegram**
   - В BotFather включите поддержку Web App и добавьте URL Vercel приложения.
   - Настройте команды бота и разрешения.

6. **Monitoring & Analytics**
   - Добавьте логику мониторинга (Sentry/Logflare) и метрики (Vercel Analytics).

7. **Security**
   - Регулярно обновляйте зависимости и проводите аудит смарт-контрактов.
