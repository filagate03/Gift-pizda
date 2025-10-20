import { BottomNav } from "../../components/bottom-nav";

export default function WithdrawPage() {
  return (
    <>
      <main className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Вывод средств</h1>
          <p className="text-sm text-white/60">
            Запросите вывод в TON, соблюдая лимиты ответственной игры и проверки безопасности.
          </p>
        </header>
        <section className="rounded-3xl bg-white/5 p-4">
          <h2 className="text-xl font-semibold">Как это работает</h2>
          <ul className="mt-3 list-disc space-y-3 pl-5 text-sm text-white/70">
            <li>Минимальный вывод — 0.1 TON. Комиссия платформы — 1%.</li>
            <li>Средства переводятся на тот же кошелек, что подключен через TON Connect.</li>
            <li>
              Заявки обрабатываются мгновенно в демо-режиме. Для продакшена подключите фактическую платежную
              логику.
            </li>
          </ul>
          <p className="mt-4 text-xs text-white/50">
            Добавьте здесь форму с подтверждением транзакции, когда интегрируете реальные выплаты.
          </p>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
