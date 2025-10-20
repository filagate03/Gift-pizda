import { BottomNav } from "../../components/bottom-nav";

export default function DepositPage() {
  return (
    <>
      <main className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Пополнение</h1>
          <p className="text-sm text-white/60">
            Подключите TON-кошелек через TON Connect и пополните баланс за пару кликов.
          </p>
        </header>
        <section className="rounded-3xl bg-white/5 p-4">
          <h2 className="text-xl font-semibold">Шаги</h2>
          <ol className="mt-3 space-y-3 text-sm text-white/70">
            <li>1. Нажмите кнопку TON Connect в шапке, чтобы авторизоваться.</li>
            <li>2. Выберите сумму пополнения и подтвердите транзакцию в кошельке.</li>
            <li>3. После подтверждения баланс обновится автоматически.</li>
          </ol>
          <p className="mt-4 text-xs text-white/50">
            Для тестового режима транзакция не отправляется — обновите интеграцию с вашим backend, когда
            подключите смарт-контракт.
          </p>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
