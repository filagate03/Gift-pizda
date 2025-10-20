import { BottomNav } from "../../components/bottom-nav";
import { ReferralStats } from "../../components/referral-stats";
import { ReputationSection } from "../../components/reputation-section";

export default function ProfilePage() {
  return (
    <>
      <main className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Профиль</h1>
          <p className="text-sm text-white/60">
            Управляйте балансом, рефералами и настройками ответственной игры.
          </p>
        </header>
        <ReferralStats />
        <ReputationSection />
        <section className="rounded-3xl bg-white/5 p-4">
          <h2 className="text-xl font-semibold">Ответственная игра</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <button className="rounded-2xl bg-white/10 py-3 font-semibold">
              Установить дневной лимит
            </button>
            <button className="rounded-2xl bg-white/10 py-3 font-semibold">
              Тайм-аут 24 часа
            </button>
            <button className="rounded-2xl bg-white/10 py-3 font-semibold">
              Тайм-аут 7 дней
            </button>
            <button className="rounded-2xl bg-white/10 py-3 font-semibold">
              Самоисключение на месяц
            </button>
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  );
}
